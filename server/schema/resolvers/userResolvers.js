require("dotenv/config")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../../models/userModel")
const { UserInputError } = require("apollo-server-express");
const { validateRegisterInput, validateLoginInput } = require("../../util/validetor");

// create generate token with jsonwebtoken
const generateToken = (user) => {
  return jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
  }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const UserResolvers = {
  // Query functions for user
  Query: {
    allUsers: async () => {
      try {
        const Users = await User.find();
        return Users
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  // Mutation functions for user
  Mutation: {
    // user register fun
    async register(_, {registerInput: {username, email, password, confirmPassword}}, context) {
      const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid) {
        throw new UserInputError("Error", { errors })
      }
      const user = User.findOne({username});
      if(!user) {
        throw new UserInputError('username is taken', {
          errors: {
            username: "This username is taken"
          }
        })
      }
      
      password = await bcrypt.hash(password, 12);
      
      const newUser = await User({
        username: username,
        email,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save();

      const token = generateToken(res);
      
      return {
        id: res._id,
        ...res._doc,
        token
      }
    },
    // user login fun
    async login(_, {loginInput: {username, password}, context}) {
      const {valid, errors} = validateLoginInput(username, password);

      if(!valid) {
        throw new UserInputError("Error", { errors });
      }

      const findUser = await User.findOne({username});
      
      if(!findUser){
        errors.general = "User not found"
        throw new UserInputError("User not found", { errors })
      }

      const match = await bcrypt.compare(password, findUser.password)

      if(!match){
        errors.general = "Wron crendetials"
        throw new UserInputError("Wron crendetials", { errors })
      }

      const token = generateToken(findUser);
      
      return {
        id: findUser._id,
        ...findUser._doc,
        token
      }
    }
  }
}

module.exports = UserResolvers
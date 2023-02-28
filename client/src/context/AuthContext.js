import { createContext, useReducer } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
const intilState = {
  user: null
}

if(localStorage.getItem("token")){
  const deCode = jwt_decode(localStorage.getItem("token"))
  if(deCode * 100 < Date.now()){
    localStorage.removeItem("token")
  }else {
    intilState.user = deCode
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
})

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, intilState)
  const navigate = useNavigate();
  function login(userData) {
    localStorage.setItem("token", userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData
    })
  }

  function logout () {
    localStorage.removeItem("token")
    navigate('/')
    dispatch({
      type: "LOGOUT",
    })
  }

  return <AuthContext.Provider value={{user: state.user, login, logout}}>
    {children}
  </AuthContext.Provider>
}

export {AuthContext, AuthProvider}
import { useMutation } from '@apollo/client';
import { useEffect, useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AuthContext } from '../../context/AuthContext';
import { MUTATION_LOGIN } from '../../graphql/Mutations';

const LoginModal = ({setOpenLogin}) => {
  const [errorState, setErrorState] = useState('');
  const {login} = useContext(AuthContext)

    // apollo mutation
    const [loginUp, {loading}] = useMutation(MUTATION_LOGIN, {
      update(proxy, {data: {login: userData}}) {
        // console.log(userData);
        login(userData);
        setOpenLogin(false);
      },
      onCompleted() {
        window.location.reload();
      },
      onError(error) {
        setErrorState(error.graphQLErrors[0].extensions.errors);
      }
    });
  
    // form sumbmit fun
    const handleSubmit = (e) => {
      e.preventDefault();
      
      loginUp({
        variables: {loginInput: {
          username: e.target.username.value,
          password: e.target.password.value,
        }}
      });
  
      emptyInputs(e)
    }
  
    useEffect(() => {
      Object.values(errorState).forEach(value => {
        toast.error(`error: ${value}`)
      })
    }, [errorState])
  
    const emptyInputs = (e) => {
      e.target.username.value = ''
      e.target.password.value = ''
    }

  const close = (e) => {
    if(e.target.className.includes('fixed')){
      setOpenLogin(false);
    }
  }

  if(loading){
    return (
      <div className='fixed z-50 top-0 left-0 bg-black/50 w-full h-full'>
        <div className='bg-white w-1/3 rounded-md p-5 shadow-xl mx-auto mt-10'>
          <div className='flex items-center justify-center'>
            <div className="lds-dual-ring"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div onClick={close} className='fixed z-50 top-0 left-0 bg-black/50 w-full h-full'>
      <div className='bg-white w-1/3 rounded-md p-5 shadow-xl mx-auto mt-10'>
        <div className='mb-4'>
          <h1 className='text-4xl text-brand-black-primary text-center'>
            Login up
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='w-full mb-4'>
            <label className='modal-label' htmlFor="user">username</label>
            <input className='modal-input' name='username' id='user' type="text" />
          </div>
          <div className='w-full mb-4'>
            <label className='modal-label' htmlFor="password">password</label>
            <input className='modal-input' name='password' id='password' type="password" />
          </div>
          <div className='flex items-center gap-10'>
            {/* Submit button  */}
            <button className='bg-brand-mainColor text-white py-3 w-full rounded-md text-lg capitalize'>
              submit
            </button>
            {/* close button  */}
            <button onClick={()=>setOpenLogin(false)} className='bg-red-600 text-white py-3 w-full rounded-md text-lg capitalize'>
              canel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginModal
import { useMutation } from '@apollo/client';
import { useEffect, useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { MUTATION_EDIT_TASK } from '../../graphql/Mutations';

const EditTaskModal = ({setOpen, taskId}) => {
  const [errorState, setErrorState] = useState('');

  // apollo mutation
  const [editTask, {loading}] = useMutation(MUTATION_EDIT_TASK, {
    update(proxy, result) {
      console.log(result);
      setOpen(false)
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
    
    editTask({
      variables: {updateInput: {
        taskId,
        body: e.target.body.value
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
    e.target.body.value = ''
  }

  const close = (e) => {
    if(e.target.className.includes('fixed')){
      setOpen(false);
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
          <h1 className='text-4xl capitalize text-brand-black-primary text-center'>
            Edit Task
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='w-full my-10'>
            <label className='modal-label' htmlFor="user">task body</label>
            <input className='modal-input' name='body' id='body' type="text" />
          </div>
          <div className='flex items-center gap-10'>
            {/* Submit button  */}
            <button type='submit' className='bg-brand-mainColor text-white py-3 w-full rounded-md text-lg capitalize'>
              edit task
            </button>
            {/* close button  */}
            <button onClick={()=>setOpen(false)} className='bg-red-600 text-white py-3 w-full rounded-md text-lg capitalize'>
              canel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditTaskModal
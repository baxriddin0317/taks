import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlinePaperAirplane } from "react-icons/hi"
import { MUTATION_ADD_COMMENT } from '../../graphql/Mutations'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

export default function CommentForm({id}) {
  const {user} = useContext(AuthContext);
  const [errorState, setErrorState] = useState('');
  const [AddComment] = useMutation(MUTATION_ADD_COMMENT, {
    onCompleted() {
      window.location.reload();
    },
    onError(error) {
      setErrorState(error.graphQLErrors[0].message);
    }
  })

  const handleAddCommit = (e) => {
    e.preventDefault();

    if(!user){
      return toast.error("you are not registered yet")
    }

    const newComment = {
      body: e.target.comment.value,
      taskId: id
    }
    console.log(e.target.comment.value);
    AddComment({
      variables: {commentInput: newComment}
    })

    e.target.comment.value = ''
  }

  useEffect(() => {
      if(errorState.length > 0){
        toast.error(`error: ${errorState}`)
      }
  }, [errorState])

  return (
    <form className='mb-10' onSubmit={handleAddCommit}>
      <h2 className='text-brand-black-primary text-xl mb-4 italic text-center'>
        Add comment
      </h2>
      <div className='flex items-center gap-1 border-b border-brand-mainColor'>
        <textarea 
          className='w-full outline-none bg-brand-mainColor/20 text-brand-black-primary italic px-2 py-px' 
          name="comment" 
          rows="1"
        ></textarea>
        <button type='submit'>
          <HiOutlinePaperAirplane className='text-brand-mainColor text-xl rotate-90' />
        </button>
      </div>
      <ToastContainer />
    </form>
  )
}

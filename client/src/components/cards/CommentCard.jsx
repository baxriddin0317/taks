import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { DELETE_COMMENT } from '../../graphql/Mutations';
import EditCommentModal from '../modals/EditCommentModal';

export default function CommentCard({comment}) {
  const {user} = useContext(AuthContext);
  const [open,setOpen] = useState(false);
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {commentId: comment.id},
    onCompleted() {
      window.location.reload();
    },
  });



  const deleteBtn = () => {
    deleteComment();
  }

  const handleEdit = () => {
    setOpen(true);
  }

  return (
    <div className='w-full flex flex-col justify-between rounded-lg shadow-md p-3 bg-white hover:shadow-xl duration-200'>
      <div className='flex items-center justify-between'>
        <p className='italic text-gray-700'>
          {comment.username}
        </p>
      </div>

      <div className='my-2'>
        <p className=''>
          {comment.body}
        </p>
      </div>

      {((user && user.username === comment.username) || (user && user.role === 'admin')) ? <div className='flex items-center gap-x-4 justify-end'>
        <button 
          onClick={handleEdit}
          className='bg-brand-mainColor btn-hover text-white rounded-md py-1 px-2 capitalize'
        >
          Edit task
        </button>
        <button 
          onClick={deleteBtn}
          className='bg-orange-600 text-white capitalize px-2 py-1 rounded-md'
        >
          delete task
        </button>
      </div> : <div>
        
      </div>}

      {open && <EditCommentModal commentId={comment.id} setOpen={setOpen} />}
    </div>
  )
}

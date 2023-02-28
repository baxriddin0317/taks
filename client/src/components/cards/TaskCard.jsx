import React, { useContext, useEffect, useState } from 'react'
import moment from "moment"
import { AuthContext } from '../../context/AuthContext'
import EditTaskModal from '../modals/EditTaskModal';
import { DELETE_TASK, MUTATION_STATUS_EDIT } from '../../graphql/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { FaRegCommentDots } from "react-icons/fa"
import { Link } from 'react-router-dom';
import { COMMENT_COUNT } from '../../graphql/Querys';

export default function TaskCard({task, username}) {
  const [open, setOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const [errorState, setErrorState] = useState('');

  // apollo mutation
  const [editStatusTask] = useMutation(MUTATION_STATUS_EDIT, {
    update(proxy, result) {
      console.log(result);
    },
    onCompleted() {
      window.location.reload();
    },
    onError(error) {
      setErrorState(error.graphQLErrors[0].extensions.errors);
    }
  });

  // delete task 
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted() {
      window.location.reload();
    },
    onError(error) {
      setErrorState(error.graphQLErrors[0].extensions.errors);
    }
  })

  // apollo query for comment count
  const count = useQuery(COMMENT_COUNT, {
    variables: {taskId: task.id}
  });

  // delete task
  
  const handleStatusBtn = (e) => {
    let newStatus = e.target.innerHTML.toUpperCase()
    editStatusTask({
      variables: {statusInput: {
        taskId: task.id,
        status: newStatus
      }}
    })
  }

  useEffect(() => {
    Object.values(errorState).forEach(value => {
      toast.error(`error: ${value}`)
    })
  }, [errorState])

  const handleDelete = () => {
    deleteTask({
      variables: {taskId: task.id}
    });
  }


  return (
    <div className='w-full flex flex-col justify-between rounded-lg shadow-md p-5 bg-white hover:shadow-xl duration-200'>
      <div className='flex items-center justify-between'>
        <p className='italic text-xl text-gray-700'>
          {task.username}
        </p>
        <p className={`${task.status ==="START" ? 'bg-green-600/50' : task.status === "ONGOING" ? 'bg-yellow-500' : 'bg-red-500' }  text-white py-1 px-4 rounded-full`}>
          {task.status}
        </p>
      </div>
      <div className='my-5'>
        <p className=''>
          {task.body}
        </p>
      </div>
      <div className='flex items-center justify-between my-2'>
        {user && user.username === task.username && task.status !== "ENDED" && (
          <>
            <button 
              onClick={() => setOpen(true)}
              className='bg-brand-mainColor btn-hover text-white rounded-md py-2 px-4 capitalize'
            >
              Edit task
            </button>
            <div>
              {task.status ==="START" && (
                <button
                  onClick={handleStatusBtn} 
                  className='bg-yellow-500 py-1 px-2 text-white italic rounded-full capitalize'>
                  ongoing
                </button>
              ) }
            </div>
          </>
        )}
        {
          user && user.role === 'admin' && (
            <div className='flex item-center gap-4'>
              {task.status ==="LATE" ? (
                <button
                  onClick={handleStatusBtn} 
                  className='bg-red-400 py-1 px-2 text-white italic rounded-full capitalize'>
                  lateend
                </button>
                ) : task.status !== "LATEEND" && task.status !== "ENDED"  && <button
                onClick={handleStatusBtn} 
                className='bg-red-500 py-1 px-2 text-white italic rounded-full capitalize'>
                ended
              </button> }
                <button 
                  onClick={handleDelete}
                  className='bg-orange-600 text-white capitalize px-4 py-2 rounded-md'
                >
                  delete task
                </button>
            </div>
          )
        }
      </div>
      <div className='flex items-center justify-between my-2'>
        <span>
          {moment(task.createdAt).startOf('hour').fromNow()}
        </span>
        <span className='capitalize'>
          deadline: {task.deadline} day
        </span>
      </div>

      <div className='my-2 flex items-center gap-1'>
        <Link to={`/${username}/${task.id}`}>
          <FaRegCommentDots className='text-brand-mainColor text-xl' />
        </Link>
        <p className='italic text-gray-400'>
          {count.data && count.data.commentCount}
        </p>
      </div>
      {open && <EditTaskModal taskId={task.id} setOpen={setOpen} />}
    </div>
  )
}

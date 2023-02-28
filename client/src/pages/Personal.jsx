import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddTask from '../components/modals/AddTask';
import Radialbar from '../components/bar/Radialbar';
import TaskCard from '../components/cards/TaskCard';
import { AuthContext } from '../context/AuthContext';
import { GET_PERSONAL_TASKS } from '../graphql/Querys';
import LateBar from '../components/bar/LateBar';
import LateEndBar from '../components/bar/LateEndBar';

export default function Personal() {
  const [taskModal, setTaskModal] = useState(false);
  const {user} = useContext(AuthContext);
  let {username} = useParams();
  // console.log(username);
  const PersonalTasks = useQuery(GET_PERSONAL_TASKS, {
    variables: {
      username: username
    }
  });

  if(PersonalTasks.loading){
    return (
      <div className='flex items-center justify-center'>
        <div className="lds-dual-ring"></div>
      </div>
    )
  }
  // console.log(PersonalTasks.data.getPersonalTask);
  return (
    <section className='container mx-auto mb-14 xl:px-3.5'>
      <div className='grid grid-cols-3 justify-center w-1/2 mx-auto mb-5'>
        <Radialbar username={username} />
        <LateEndBar username={username} />
        <LateBar username={username} />
      </div>
      {user && user.username.toLowerCase() === username.toLowerCase() && (
        <div className='flex w-full justify-end my-5'>
          <button 
            onClick={() => setTaskModal(true)}
            className='text-white bg-green-700 rounded-md py-2 px-4 capitalize'
          >
            + new task
          </button>
        </div>
      )}
      {PersonalTasks.data.getPersonalTask.length > 0 ? (
        <div className='grid md:grid-cols-2 gap-10'>
          {PersonalTasks.data.getPersonalTask.map(task => (
            <TaskCard key={task.id} task={task} username={username} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-full w-full'>
          <p className='text-gray-500 capitalize text-xl italic'>
          this user has not created tasks yet
          </p>
        </div>
      )}

      {taskModal && <AddTask setTaskModal = {setTaskModal} />}
    </section>
  )
}


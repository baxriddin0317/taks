import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_PERSONAL_TASKS } from '../../graphql/Querys';

export default function UserCard({item}) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const [startCount, setStartCount] = useState(0)
  const [OngoingCount, setOngoingCount] = useState(0)
  const [EndCount, setEndCount] = useState(0)
  const [lateCount, setLateCount] = useState(0);
  const [lateEndCount, setLateEndCount] = useState(0);
  // console.log(username);
  const {data, loading} = useQuery(GET_PERSONAL_TASKS, {
    variables: {
      username: item.username
    }
  });

  useEffect(()=>{
    if(data){
      setTasks(data.getPersonalTask)
    }
  }, [data]);

  useEffect(() => {
    setStartCount(0);
    setOngoingCount(0);
    setEndCount(0);
    setLateCount(0);

    if(data){
      tasks.forEach(task => {
        if(task.status === "START"){
          setStartCount(prev=> prev+1)
        }
        if(task.status === "ONGOING"){
          setOngoingCount(prev=> prev+1)
        }
        if(task.status === "ENDED"){
          setEndCount(prev=> prev+1)
        }
        if(task.status === "LATE"){
          setLateCount(prev=> prev+1)
        }
        if(task.status === "LATEEND"){
          setLateEndCount(prev=> prev+1)
        }
      })
    }
  }, [tasks])
  
  if(loading){
    return (
      <div className='flex items-center justify-center'>
        <div className="lds-dual-ring"></div>
      </div>
    )
  }

  const handleClick = () => {
    navigate(`/${item.username}`);
  }
  return (
    <div 
      onClick={handleClick}
      className='w-full rounded-lg shadow-md p-5 bg-white hover:shadow-xl duration-200 cursor-pointer'
    >
      <div className='flex items-center justify-between'>
        <p className='italic text-xl text-gray-700'>
          {item.username}
        </p>
      </div>

      <div className='my-4 flex items-center gap-5'>
        <p className='bg-lime-600/50 text-xs text-white py-1 px-2 rounded-full'>Start tasks: {startCount}</p>
        <p className='bg-yellow-600/50 text-xs text-white py-1 px-2 rounded-full'>Ongoing tasks: {OngoingCount}</p>
        <p className='bg-green-600/50 text-xs text-white py-1 px-2 rounded-full'>End tasks: {EndCount}</p>
        <p className='bg-red-600/50 text-xs text-white py-1 px-2 rounded-full'>Late tasks: {lateCount}</p>
        <p className='bg-orange-600/50 text-xs text-white py-1 px-2 rounded-full'>LateEnd tasks: {lateEndCount}</p>
      </div>
  </div>
  )
}

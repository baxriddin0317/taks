import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import {useQuery} from "@apollo/client"
import { GET_ALL_TASK, GET_PERSONAL_TASKS } from '../graphql/Querys'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [ load, setLoad] = useState(false);
  const [ page, setPage] = useState(0);
  let PAGE_SIZE = 6
  
  const {data, loading, error} = useQuery(GET_ALL_TASK, {
    variables: {
      first: PAGE_SIZE,
      skip: page * PAGE_SIZE
    }
  });

  useEffect(()=>{
    if(data){
      setTasks(data.getTasks)
    }
  }, [data, load]);

  useEffect(()=> {
    let filterTasks = tasks.filter(task => {
      if(searchVal === ""){
        setLoad(!load);
        return task;
      }else if (task.username.toLowerCase().includes(searchVal.toLowerCase())){
        return task;
      }
    });

    setTasks(filterTasks)
  },[searchVal])

  if(loading){
    return (
      <div className='flex items-center justify-center'>
        <div className="lds-dual-ring"></div>
      </div>
    )
  }
  
  if(error) {
    return toast.error(`error: ${error.message}`)
  }


  return (
    <>
      <section className='container mx-auto mb-5 xl:px-3.5'>
        <SearchBar setSearchVal={setSearchVal} />
      </section>
      <section className='container mx-auto py-5 mb-14 xl:px-3.5'>
        <div className='grid md:grid-cols-2 gap-10'>
          {data && tasks.map((task, idx) => (
            <TaskCard key={idx} task={task} />
          ))}
        </div>
        <div className='flex justify-center items-center gap-10 my-10'>
            <button
              disabled={!page}
              onClick={() => setPage(prev => prev - 1)} 
              className={`${!page ? 'bg-gray-500' : 'bg-brand-mainColor btn-hover'} btn-rounded text-white py-2 px-4`}
            >prev</button>
            <p>page {page + 1}</p>
            <button
              disabled={tasks.length / PAGE_SIZE < page}
              onClick={() => setPage(prev => prev + 1)}
              className={`${tasks.length / PAGE_SIZE < page ? 'bg-gray-500' : 'bg-brand-mainColor btn-hover'} btn-rounded text-white py-2 px-4`}
            >next</button>
        </div>
      </section>
    </>
  )
}

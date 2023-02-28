import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import UserCard from '../components/cards/UserCard';
import { GET_ALL_USER } from '../graphql/Querys'

export default function Users() {
  const [users, setUsers] = useState([]);
  const {data, loading, error} = useQuery(GET_ALL_USER);

  useEffect(()=>{
    if(data){
      setUsers(data.allUsers)
    }
  }, [data]);

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
    <section className='container mx-auto py-5 mb-14 xl:px-3.5'>
      <div className='grid md:grid-cols-2 gap-10'>
        {data && users.map(user => (
          <UserCard key={user.id} item={user} />
        ))}
      </div>
    </section>
  )
}

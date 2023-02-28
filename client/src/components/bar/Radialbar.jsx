import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_PERCENT } from '../../graphql/Querys';

export default function Radialbar({username}) {
  const {data} = useQuery(GET_PERCENT, {
    variables: {username}
  })
  
  return (
    <div className='mx-auto w-28 h-30 mb-1 flex items-center flex-col justify-center'>
      {data ? <CircularProgressbar value={data.percent} text={`${data.percent}%`} /> :
      <CircularProgressbar value={0} text={`0%`} />}
      <h1 className='capitalize text-lg font-bold text-center whitespace-nowrap'>
        completed task
      </h1>
    </div>
  )
}

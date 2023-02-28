import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react'
import { useQuery } from '@apollo/client';
import { LATEEND_PERCENT } from '../../graphql/Querys';

export default function LateEndBar({username}) {
  const {data} = useQuery(LATEEND_PERCENT, {
    variables: {username}
  })
  
  return (
    <div className='w-28 mx-auto h-30 mb-1 flex items-center flex-col justify-center'>
      {data ? <CircularProgressbar value={data.lateEndPercent} text={`${data.lateEndPercent}%`} /> :
      <CircularProgressbar value={0} text={`0%`} />}
      <h1 className='capitalize text-lg font-bold text-center whitespace-nowrap'>
        late ended task
      </h1>
    </div>
  )
}

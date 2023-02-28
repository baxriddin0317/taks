import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/cards/CommentCard' 
import CommentForm from '../components/form/CommentForm'
import { GET_COMMENT } from '../graphql/Querys'

export default function Comments() {
  const {id} = useParams();
  const {data, loading} = useQuery(GET_COMMENT,{
    variables: {taskId: id}
  })
  
  if(loading){
    return (
      <div className='flex items-center justify-center'>
        <div className="lds-dual-ring"></div>
      </div>
    )
  }
  
  return (
    <section className='container mx-auto mb-14 xl:px-3.5'>
      <div className='w-1/2 mx-auto flex flex-col gap-y-3'>
        <CommentForm id={id} />
        {data && data.getComment.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>  
    </section>
  )
}

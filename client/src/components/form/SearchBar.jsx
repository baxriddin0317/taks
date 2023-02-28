import React from 'react'

export default function SearchBar({setSearchVal}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchVal(e.target.search.value); 
  }

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-1/2 flex items-center gap-4'>
        <div className='w-full'>
          <input 
            className='w-full py-3 px-5 border border-brand-mainColor rounded-full outline-none' 
            type="text"
            name='search'
            placeholder='Search by username'
          />
        </div>
        <button type='submit' className='bg-brand-mainColor text-white btn-rounded btn-hover py-3 px-5 '>
          Search
        </button>
      </form>
    </div>
  )
}

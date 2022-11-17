import React from 'react'

const Search = ({search,setSearch}) => {
  return (
    <div className='flex justify-center gap-4'>
      <input
      value={search}
       onChange={( e )=> { 
          setSearch(e.target.value)  
       }  }
        className='border  w-96 rounded-lg   focus:border-black p-3' />
      
     
    </div>
    
  )
}

export default Search
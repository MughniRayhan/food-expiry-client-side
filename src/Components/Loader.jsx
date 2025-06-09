import React from 'react'

function Loader() {
  return (
     <div className='h-screen bg-base-200 flex justify-center items-center'>
        <span className="loading loading-bars loading-xl text-success"></span>
    </div>
  )
}

export default Loader
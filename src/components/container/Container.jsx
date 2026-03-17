import React from 'react'

function Container({children}) {
  return (
    <div className='w-full h-full flex flex-col justify-between'>
     {children}
    </div>
  )
}

export default Container

import React from 'react'

function Button({
    children,
    type='button',
 className='',
 ...props
},ref) {
  return (
    <button
      type={type}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

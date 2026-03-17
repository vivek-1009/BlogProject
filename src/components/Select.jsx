import React,{useId} from 'react'

function Select({
    
    label,
    options,
    classname='',
    ...props
},ref
) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor=
        {id} className=''>
            </label>
            }
            <select
            {...props}
            id={id}
            ref={ref}
            >
{options ?.map((option)=>(
    <option key={option} value={option}>
       
    </option>
)
)}
            </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
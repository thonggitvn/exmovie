import React from 'react'

const Section = ({children,titleSection}) => {
  return (
    <div className='mt-3'>
        <h3 className='text-3xl font-bold text-center py-5' >{titleSection}</h3>
        {children}
    </div>
  )
}

export default Section
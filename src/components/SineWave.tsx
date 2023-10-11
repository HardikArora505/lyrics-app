import React from 'react'
import "../assets/css/sineWave.css"
const items=['obj-1', 'obj-2', 'obj-3', 'obj-4', 'obj-5', 'obj-6', 'obj-7', 'obj-8', 'obj-9', 'obj-10', 'obj-11', 'obj-12', 'obj-13', 'obj-14', 'obj-15', 'obj-16', 'obj-17', 'obj-18', 'obj-19', 'obj-20', 'obj-21', 'obj-22','obj-23','obj-24','obj-25','obj-26','obj-27','obj-28','obj-29','obj-30','obj-31','obj-32']

const SineWave = () => {
  return (
    <div className="loading w-[72rem]">
      {
        items.map((id)=>{
          return(
            <div className='obj' id={id} key={id}></div>
            )
          })
        }
    </div>
  )
}

export default SineWave
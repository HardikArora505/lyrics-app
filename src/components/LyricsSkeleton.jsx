import React from 'react'
import "../assets/css/lyricsSkeleton.css"

const LyricsSkeleton = () => {
  return (
    <div className='mt-14'>
    <div className="loading-skeleton" style={{width:"40%"}}></div>
    <div className="loading-skeleton" style={{width:"50%"}}></div>
    <div className="loading-skeleton" style={{width:"75%"}}></div>
    <div className="loading-skeleton" style={{width:"60%"}}></div>
    <div className="loading-skeleton" style={{width:"45%"}}></div>
    <div className="loading-skeleton" style={{width:"60%"}}></div>
    <div style={{margin:"1rem"}}/>
    <div className="loading-skeleton" style={{width:"75%"}}></div>
    <div className="loading-skeleton" style={{width:"60%"}}></div>
    <div className="loading-skeleton" style={{width:"82%"}}></div>
    <div className="loading-skeleton" style={{width:"40%"}}></div>
    <div className="loading-skeleton" style={{width:"85%"}}></div>
    <div className="loading-skeleton" style={{width:"90%"}}></div>
    </div>
  )
}

export default LyricsSkeleton
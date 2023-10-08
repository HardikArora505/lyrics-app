import React, { FC, useContext, useLayoutEffect } from 'react'
import { SongContext } from './MainArea'

interface Props{
    search:string,
    modalOpen:boolean,
    setModalOpen:(m:boolean)=>{}
}


const SearchItem:FC<Props> = ({search,modalOpen,setModalOpen}) => {
    const s=useContext(SongContext)
    const close=async()=>{
       await  gsap.to('.search_modal', { y: -400, duration: 0.2 });
       s.setSongId(search?.id)
        setModalOpen(false)
    }

  return (
    <div onClick={()=>close()} className='flex items-center p-2 max-w-full rounded-lg m-2 cursor-pointer' style={{background:"linear-gradient(45deg, black, transparent)"}}>
        <div className="search_img mr-auto w-36 p-2"><img src={search?.song_art_image_thumbnail_url} alt="song art cover" /></div>
        <div className='w-full'>
            <div><h6>{search?.artist_names}</h6></div>
            <p className='text-2xl'>{search?.full_title}</p>
        </div>
    </div>
  )
}

export default SearchItem
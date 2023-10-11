import React, { FC, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SongContext } from './MainArea'
import WavesLoader from './WavesLoader'

interface Props {
  search?: string,
  modalOpen?: boolean,
  setModalOpen?: (m: boolean) => {},
  loading?:boolean
}


const SearchItem: FC<Props> = ({ search, modalOpen, setModalOpen,loading}) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(true)
  
  const s = useContext(SongContext)
  console.log("loading",loading)
  const close = async () => {
    await gsap.to('.search_modal', { y: -400, duration: 0.2 });
    s.setSongId(search?.id)
    setModalOpen(false)
  }

  return (
          <div onClick={() => { loading?"":close()}} className={`flex items-center p-2 max-w-full rounded-lg m-2 cursor-pointer`} style={{ background: "linear-gradient(45deg, #000000, #1e293b)" }}>
            <div className={`search_img mr-auto w-36 p-2 relative flex items-center justify-center${imgLoaded?"w-[6.667rem] h-[6.667rem] ":""}`}>{ imgLoaded && <WavesLoader/>}<img src={search?.song_art_image_thumbnail_url} alt="song art cover" onLoad={()=>setImgLoaded(false)} className={`${imgLoaded?"hidden":""}`}/></div>
            <div className='w-full'>
              <div><h6>{loading?<WavesLoader height="10px"/>:search?.artist_names}</h6></div>
              <p className='text-xl flex items-center justify-center'>{loading?<div className='flex mx-auto'><WavesLoader height="10px"/><WavesLoader height="10px"/><WavesLoader height="10px"/><WavesLoader height="10px"/></div>:search?.full_title}</p>
            </div>
          </div>

  )
}

export default SearchItem
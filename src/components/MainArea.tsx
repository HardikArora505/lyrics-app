import axios from 'axios'
import React, { useState, useEffect, createContext } from 'react'
import LyricsSkeleton from './LyricsSkeleton'
import "../assets/css/MainArea.css"
import SearchBox from './SearchBox'
import WavesLoader from './WavesLoader'
import SineWave from './SineWave'
export const SongContext = createContext("");


const MainArea = () => {
    const [lyrics, setLyrics] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [songId, setSongId] = useState<number>(-1)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [imgURL,setImgURL]=useState<string>("")
    const searchIC =
        <span className='cursor-pointer'>
            <svg onClick={(e) => { e.stopPropagation(); setModalOpen(true) }} width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='m19 19-3.5-3.5' stroke='#94a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /><circle cx='11' cy='11' r='6' stroke='#94a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /></svg>

        </span>
    const fetchLyrics = () => {
        // e.preventDefault()
        setLoading(true)
        if (lyrics.length < 1) {
            setLoading(false)
            setLyrics("\n\n Tip: for more precision provide artist names");
            return

        }
        axios.get(`https://drab-puce-ox-hose.cyclic.cloud/lyrics/${songId}`)
            .then(res => {
                setLoading(false);
                console.log(res)
                setLyrics("\n" + res.data.lyrics + "\n\n\n")
            })
    }
    useEffect(()=>{
        fetchLyrics()
    },[songId])
    return (
        <div className='flex h-full w-full gap-14'>
            {/* <form action="" className='flex flex-col gap-2' onSubmit={(e) => { fetchLyrics(e) }}>
                <label htmlFor="artist" className='flex justify-items-start'>Artist</label>
                <input className="text-blue-900" type="text" name="artist" id="" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <label htmlFor="song" className='flex justify-items-start'>Song</label>
                <input className="text-blue-900" type="text" name="song" id="" value={song} onChange={(e) => setSong(e.target.value)} />
                <button type="submit" >search</button>
            </form> */}
            {searchIC}
            <div className="flex flex-col bg-[#e62525] text-black px-4 rounded-lg max-h-[42rem] min-h-[42rem] min-w-[51rem] gap-5 pb-3 pt-7 relative">
                <div className='tracking-[0.3rem] absolute z-10 left-4 top-0 text-white'>Lyrics</div>
                <div className="absolute w-full top-0 left-0 lyrics-faded-top"></div>
                <div className='max-h-[40rem] overflow-y-auto scrollbar-hide'>
                    {
                        loading ? <SineWave /> : <p style={{ whiteSpace: "pre-line", opacity: `${loading ? "0" : "1"}`, transition: "all ease-in 1s" }}>{lyrics}</p>
                    }
                </div>
                <div className="absolute w-full bottom-0 left-0 lyrics-faded-bottom"></div>
            </div>
            <SongContext.Provider value={{setSongId}}>
                <SearchBox modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </SongContext.Provider>

        </div>
    )
}

export default MainArea
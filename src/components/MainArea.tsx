import axios from 'axios'
import React, { useState, useEffect, createContext } from 'react'
import LyricsSkeleton from './LyricsSkeleton'
import "../assets/css/MainArea.css"
import SearchBox from './SearchBox'
import WavesLoader from './WavesLoader'
import SineWave from './SineWave'
import { generateColors } from '../helperFunctions/helpers'
export const SongContext = createContext("");



const MainArea = () => {
    const [lyrics, setLyrics] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [songId, setSongId] = useState<number>(-1)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [imgURL, setImgURL] = useState<string>("")
    const [color, setColor] = useState<string>("#039b96")
    const [textColor, setTextColor] = useState<string>("#000000")


    const searchIC =
        <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='m19 19-3.5-3.5' stroke={`${textColor}`} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /><circle cx='11' cy='11' r='6' stroke={`${textColor}`} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /></svg>
    const fetchLyrics = async () => {
        // e.preventDefault()
        setLoading(true)
        document.getElementById('lyrics_para').style.opacity = "0"

        if (lyrics.length < 1) {
            setLoading(false)
            setLyrics("\n\n Tip: for more precision provide artist names");
            return

        }
        const response = await axios.get(`https://drab-puce-ox-hose.cyclic.cloud/lyrics/${songId}`)

        // Select even and odd elements
        const even = document.querySelectorAll('.obj:nth-child(even)');
        const odd = document.querySelectorAll('.obj:nth-child(odd)');

        const evenAnimation = gsap.timeline()
            .to(even, {
                scaleY: 0,
                duration: 1,
                opacity: 0
            })

        const oddAnimation = gsap.timeline()
            .to(odd, {
                scaleY: 0,
                duration: 1,
                opacity: 0
            })


        // Start both animations at the same time
        await gsap.timeline()
            .add(evenAnimation, 0) // Starts at 0 seconds
            .add(oddAnimation, 0)
        setLoading(false);
        setLyrics("\n" + response.data.lyrics + "\n\n\n")


    }
    useEffect(() => {
        fetchLyrics()
        const {newColor}=generateColors()
        const k=newColor.split(" ").filter((e:string)=>{if(e.includes("#") && e[1]!=='0'){return e}})[0]
        if(k==="#580481" || k==="#380036" || k==="#414141" || k==="#5f0f40" || k==="#5a585a"){
            setTextColor("#ffffff")
        }
        else{
            setTextColor("#000000")
        }
        setColor(k)

    }, [songId])

    useEffect(() => {
        // const showLyrics = gsap.timeline()
        // .from(para,{
        //     opacity:0,
        //     duration:0.5
        // })
        // .to(para,{
        //     opacity:1,
        // })
        if (lyrics.length > 0) {
            document.getElementById('lyrics_para').style.opacity = "1"
            //  gsap.timeline().add(showLyrics,0)
        }


    }, [lyrics])
    return (
        <div className='flex h-full w-full gap-14 main-area round-border' style={{boxShadow:"-8px 10px 10px #000"}}>
            <div className={`flex flex-col  text-black px-4 rounded-lg max-h-[65rem] min-h-[37rem] h-[calc(100vh-4rem)] min-w-[71rem] gap-5 pb-3 pt-7 relative mix-blend-luminosity`} style={{background:`${color}`}}>
            <span onClick={(e) => { e.stopPropagation(); setModalOpen(true) }} className='cursor-pointer w-11 h-11 flex items-center justify-center rounded-full absolute -left-16 top-0 z-50' style={{background:`linear-gradient(45deg, ${color}, #710ac1a3)`,boxShadow:"-2px 7px 10px black"}}>
                {searchIC}
            </span>
                <div className='tracking-[0.3rem] absolute z-10 left-4 top-0 text-white font-medium'>Lyrics</div>
                <div className="absolute w-full top-0 left-0 lyrics-faded-top round-border" style={{background:`linear-gradient(0deg, rgb(185 28 28 / 0%), ${color})`,boxShadow:` inset 0px 50px 33px ${color}`}}></div>
                <div className=' overflow-y-auto scrollbar-hide' >
                    {
                        loading ? <SineWave textColor={textColor} /> : <p style={{ whiteSpace: "pre-line", opacity: "0",color:`${textColor}` }} id="lyrics_para">{lyrics}</p>
                    }
                </div>
                <div className="absolute w-full bottom-0 left-0 lyrics-faded-bottom round-border" style={{ background: `linear-gradient(180deg, rgb(185 28 28 / 0%), ${color})`,boxShadow: `inset 0px -34px 33px ${color}`}}></div>
            </div>
            <SongContext.Provider value={{ setSongId, loading,textColor }}>
                <SearchBox modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </SongContext.Provider>

        </div>
    )
}

export default MainArea
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import "../assets/css/searchBox.css"
import { gsap } from 'gsap';
import axios from 'axios';
import _ from 'lodash';
import SearchItem from './SearchItem';
let source = axios.CancelToken.source();

const searchIC =
    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='m19 19-3.5-3.5' stroke='#94a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /><circle cx='11' cy='11' r='6' stroke='#94a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /></svg>
interface modalOptions {
    modalOpen: boolean;
    setModalOpen: any
}

const SearchBox: FC<modalOptions> = ({ modalOpen, setModalOpen }) => {
    const modalContent = useRef(null)
    console.log("modal", modalOpen)
    const [song, setSong] = useState<string>("")
    const [items, setItems] = useState<any[]>([])
    const [artist, setArtist] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useLayoutEffect(() => {
        if (modalOpen) {
            gsap.to('.backdrop_blur', { opacity: 1, duration: 0.3 });
            gsap.from('.search_modal', { y: -100, duration: 0.1 });
        }
    }, [modalOpen])

    useEffect(() => {
        const clickhandler = async ({ target }: any) => {
            if (!modalOpen || modalContent.current.contains(target)) return;
            await gsap.to('.search_modal', { y: -400, duration: 0.2 });
            setModalOpen(false)
        }
        document.addEventListener("click", clickhandler)

        return () => document.removeEventListener("click", clickhandler)
    })

    useEffect(() => {

        const keyHandler = async ({ keyCode }: any) => {
            if (!modalOpen || keyCode !== 27) return;
            await gsap.to('.search_modal', { y: -200, duration: 0.2 });
            setModalOpen(false)
        }

        document.addEventListener("keydown", keyHandler)

        return () =>{document.removeEventListener("keydown", keyHandler)}
    })

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoading(true)
            // This will be fired when the user has stopped typing for a certain amount of time
            // Now, you can make your API call here with the value of `searchTerm`
            axios.post(`https://drab-puce-ox-hose.cyclic.cloud/get-songs-list`, {
                artist: artist,
                track: song
            }, { cancelToken: source.token})
                .then(res => {
                    setLoading(false);
                    console.log(res)
                    setItems(res.data)
                })
            console.log('Searching for:', song);
        }, 300); // Adjust the delay as per your preference (in milliseconds)

        return () =>{clearTimeout(delayDebounceFn);} // This will clean up the timeout on each keystroke
    }, [song]);

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setSong(value);
    };
    return (
        <>
            {
                modalOpen &&

                <div className='backdrop_blur items-center fixed top-0 left-0 z-50 flex flex-col h-screen w-screen  backdrop-blur-lg' >
                    <div ref={modalContent} className="search_modal max-w-3xl min-w-[48rem] flex flex-col rounded-lg bg-[#1e293b] mt-4" style={{ boxShadow: "inset 0 1px 0 0 #ffffff0d" }}>
                        <header className='flex items-center px-4'>
                            <form action="" className='flex items-center grow shrink border-b-[#94a3b8] border-b'>
                                <label htmlFor="song">{searchIC} </label>
                                <input value={song} onChange={handleInputChange} className="appearance-none bg-[#0000] h-14 outline-none ml-3 mr-4 w-full" aria-autocomplete="both" autoComplete="off" autoCorrect="off" autoCapitalize="off" enterKeyHint="go" spellCheck="false" placeholder="Search Song" type="search" aria-controls="docsearch-list" />
                            </form>
                        </header>
                        <div className="search_dropdown pt-6 mb-3 overflow-y-auto max-h-[29rem] scrollbar-hide ">
                            {loading ?
                            <>
                            <SearchItem loading={loading}/>
                            <SearchItem loading={loading}/>
                            <SearchItem loading={loading}/>
                            <SearchItem loading={loading}/>
                            </>
                            :items.map((e:any) => <SearchItem search={e} modalOpen={modalOpen} setModalOpen={setModalOpen} loading={loading} key={e.id} />)}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SearchBox
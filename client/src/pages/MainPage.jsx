import React, { useEffect, useRef } from 'react'
import SettingBar from '../components/SettingBar'
import Toolbar from '../components/ToolBar'
import Canvas from '../components/Canvas'
import ModalWindow from '../components/ModalWindow'
import bgVideo from '../assets/background.mp4'
import bgMusic from '../assets/bgmusic.mp3'
import '../styles/modal.scss'

const MainPage = () => {
	const audioRef = useRef(null)

	useEffect(() => {
		const startMusic = () => {
			audioRef.current.volume = 0.1
			audioRef.current.play()

			document.removeEventListener('click', startMusic)
		}

		document.addEventListener('click', startMusic)

		return () => {
			document.removeEventListener('click', startMusic)
		}
	}, [])
	return (
		<>
			<audio ref={audioRef} src={bgMusic} loop />
			<video className='bg-video' autoPlay muted loop playsInline>
				<source src={bgVideo} type='video/mp4'></source>
			</video>
			<Toolbar />
			<SettingBar></SettingBar>
			<Canvas></Canvas>
			<ModalWindow></ModalWindow>
		</>
	)
}

export default MainPage

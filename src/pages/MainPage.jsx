import React from 'react'
import SettingBar from '../components/SettingBar'
import Toolbar from '../components/ToolBar'
import Canvas from '../components/Canvas'
import ModalWindow from '../components/ModalWindow'

const MainPage = () => {
	return (
		<>
			<Toolbar />
			<SettingBar></SettingBar>
			<Canvas></Canvas>
			<ModalWindow></ModalWindow>
		</>
	)
}

export default MainPage

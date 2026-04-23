import React from 'react'
import './styles/app.scss'

import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'

import { observer } from 'mobx-react-lite'

const App = observer(() => {
	return (
		<div className='app'>
			<BrowserRouter>
				<AppRouter></AppRouter>
			</BrowserRouter>
		</div>
	)
})

export default App

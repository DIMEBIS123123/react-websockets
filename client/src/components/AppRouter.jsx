import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'

const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Navigate to={`/${(+new Date()).toString(16)}`} replace />}
			/>

			<Route
				key={`${(+new Date()).toString(16)}`}
				path='/:id'
				element={<MainPage />}
			/>
		</Routes>
	)
}

export default AppRouter

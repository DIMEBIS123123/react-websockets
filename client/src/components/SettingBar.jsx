import React from 'react'
import toolState from '../store/toolState'

const SettingBar = () => {
	return (
		<div className='bar settingbar'>
			<label htmlFor='line-width'>Толщина линии</label>
			<input
				onChange={e => {
					toolState.setLineWidth(e.target.value)
					toolState.setSettingLineWidth(e.target.value)
				}}
				style={{ margin: '0 10px' }}
				id='line-width'
				type='number'
				defaultValue={1}
				min={1}
				max={50}
			/>
			<label htmlFor='stroke-color'>Цвет обводки</label>
			<input
				onChange={e => {
					toolState.setStrokeColor(e.target.value)
					toolState.setSettingStrokeColor(e.target.value)
				}}
				style={{ margin: '0 10px' }}
				id='stroke-color'
				type='color'
				defaultValue='white'
			/>
			<label htmlFor='fill-color'>Цвет заливки</label>
			<input
				onChange={e => {
					toolState.setFillColor(e.target.value)
					toolState.setSettingFillColor(e.target.value)
				}}
				className='toolbar__btn color'
				style={{ margin: '0 10px' }}
				type='color'
				id='fill-color'
				defaultValue='white'
			/>
		</div>
	)
}

export default SettingBar

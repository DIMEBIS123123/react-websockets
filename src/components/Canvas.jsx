import React, { useEffect, useRef } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import { useParams } from 'react-router-dom'
import userConnect from '../api/clientWs.js'
const Canvas = observer(() => {
	const canvasRef = useRef()
	const params = useParams()

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
	}, [])

	useEffect(() => {
		userConnect(params.id)
	}, [canvasState.username])

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
	}
	return (
		<div className='canvas-wrapper'>
			<canvas
				onMouseDown={() => mouseDownHandler()}
				ref={canvasRef}
				width={800}
				height={600}
			></canvas>
		</div>
	)
})

export default Canvas

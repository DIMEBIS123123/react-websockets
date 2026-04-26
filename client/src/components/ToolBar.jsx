import React, { useEffect } from 'react'
import '../styles/toolbar.scss'
import '../styles/app.scss'
import { observer } from 'mobx-react-lite'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'

const Toolbar = observer(() => {
	const downloadSave = () => {
		const dataUrl = canvasState.canvas.toDataURL()
		const a = document.createElement('a')
		a.href = dataUrl
		a.download = canvasState.sessionId + 'jpg'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}
	useEffect(() => {
		if (!toolState.tool) return
		toolState.setFillColor(toolState.settingFillColor)
		toolState.setStrokeColor(toolState.settingStrokeColor)
		toolState.setLineWidth(toolState.settingLineWidth)
	}, [toolState.tool])
	return (
		<div className='bar toolbar'>
			<button
				className='toolbar__btn brush'
				onClick={() => {
					toolState.setTool(
						new Brush(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionId,
						),
					)
				}}
			></button>
			<button
				className='toolbar__btn rect'
				onClick={() =>
					toolState.setTool(
						new Rect(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionId,
						),
					)
				}
			></button>
			<button
				className='toolbar__btn circle'
				onClick={() =>
					toolState.setTool(
						new Circle(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionId,
						),
					)
				}
			></button>
			<button
				className='toolbar__btn eraser'
				onClick={() =>
					toolState.setTool(
						new Eraser(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionId,
						),
					)
				}
			></button>
			<button
				className='toolbar__btn line'
				onClick={() =>
					toolState.setTool(
						new Line(
							canvasState.canvas,
							canvasState.socket,
							canvasState.sessionId,
						),
					)
				}
			></button>

			<button
				className='toolbar__btn clean'
				onClick={() => {
					canvasState.socket.send(
						JSON.stringify({
							id: canvasState.sessionId,
							method: 'draw',
							figure: {
								type: 'clean',
							},
						}),
					)
				}}
			></button>
			<button
				className='toolbar__btn undo'
				onClick={() => canvasState.undo()}
			></button>
			<button
				className='toolbar__btn redo'
				onClick={() => canvasState.redo()}
			></button>
			<button
				onClick={() => downloadSave()}
				className='toolbar__btn save'
			></button>
		</div>
	)
})

export default Toolbar

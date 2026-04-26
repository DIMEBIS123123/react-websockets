import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Rect from '../tools/Rect'

const { default: canvasState } = require('../store/canvasState')

const drawHandler = msg => {
	const figure = msg.figure
	const ctx = canvasState.canvas.getContext('2d')

	switch (figure.type) {
		case 'brush':
			Brush.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Brush.draw(ctx, figure.x, figure.y)

			break
		case 'rect':
			Rect.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
			break
		case 'circle':
			Circle.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Circle.staticDraw(ctx, figure.x, figure.y, figure.radius)
			break
		case 'eraser':
			Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
			break
		case 'line':
			Line.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Line.staticDraw(ctx, figure.x, figure.y, figure.startX, figure.startY)
			break
		case 'clean':
			canvasState.clean()

			break
		case 'finish':
			ctx.beginPath()
			break
		default:
			break
	}
}

const userConnect = id => {
	if (canvasState.username) {
		const socket = new WebSocket('ws://localhost:5000')
		const sessionId = id
		canvasState.setSocket(socket)
		canvasState.setSessionId(id)

		toolState.setTool(new Brush(canvasState.canvas, socket, id))

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					id: sessionId,
					username: canvasState.username,
					method: 'connection',
				}),
			)
		}
		socket.onmessage = e => {
			let msg = JSON.parse(e.data)
			switch (msg.method) {
				case 'connection':
					console.log(`Пользователь ${msg.username} успешно подключился!`)
					break

				case 'draw':
					drawHandler(msg)
					break
				default:
					break
			}
		}
	}
}
export default userConnect

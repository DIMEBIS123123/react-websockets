import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Rect from '../tools/Rect'

const { default: canvasState } = require('../store/canvasState')
const addToUndo = figure => {
	canvasState.pushToUndo(figure)
}
const drawHandler = msg => {
	const figure = msg.figure
	const ctx = canvasState.canvas.getContext('2d')

	switch (figure.type) {
		case 'brush':
			addToUndo(figure)
			Brush.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Brush.draw(ctx, figure.x, figure.y)

			break
		case 'rect':
			addToUndo(figure)
			Rect.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
			break
		case 'circle':
			addToUndo(figure)
			Circle.applySettingBar(
				ctx,
				figure.fillColor,
				figure.strokeColor,
				figure.lineWidth,
			)
			Circle.staticDraw(ctx, figure.x, figure.y, figure.radius)
			break
		case 'eraser':
			addToUndo(figure)
			Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
			break
		case 'line':
			addToUndo(figure)
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
		case 'undo':
			ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
			let figureCount = 0
			let figureId = 0
			canvasState.undoList = figure.undoList
			figure.undoList.forEach(figure => {
				figureCount += 1
				if (figureCount == 1) {
					figureId = figure.id
					ctx.beginPath()
				}
				if (figureId != figure.id) {
					ctx.beginPath()
					figureId = figure.id
				}
				canvasState.redraw(figure, ctx)
			})
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

		toolState.setTool(
			new Brush(canvasState.canvas, socket, id, canvasState.username),
		)

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

import toolState from '../store/toolState'
import Brush from '../tools/Brush'

const { default: canvasState } = require('../store/canvasState')

const drawHandler = msg => {
	const figure = msg.figure
	const ctx = canvasState.canvas.ctx
	switch (figure.type) {
		case 'bush':
			Brush.draw(ctx, figure.x, figure.y)
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
			}
		}
	}
}
export default userConnect

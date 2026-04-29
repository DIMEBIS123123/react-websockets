import Tool from './Tools'

export default class Brush extends Tool {
	constructor(canvas, socket, id, username) {
		super(canvas, socket, id, username)
		this.listen()
	}
	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
		this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
	}
	mouseUpHandler(e) {
		this.mouseDown = false
		this.socket.send(
			JSON.stringify({
				id: this.id,
				method: 'draw',
				figure: {
					type: 'finish',
				},
			}),
		)
	}
	mouseLeaveHandler(e) {
		this.mouseDown = false
		this.socket.send(
			JSON.stringify({
				id: this.id,
				method: 'draw',
				figure: {
					type: 'finish',
				},
			}),
		)
	}
	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath()
		this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
		this.figureId = Date.now()
	}
	mouseMoveHandler(e) {
		if (this.mouseDown) {
			// this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)

			this.socket.send(
				JSON.stringify({
					id: this.id,
					method: 'draw',
					figure: {
						type: 'brush',
						username: this.username,
						id: this.figureId,
						x: e.pageX - e.target.offsetLeft,
						y: e.pageY - e.target.offsetTop,
						fillColor: this.ctx.fillStyle,
						strokeColor: this.ctx.strokeStyle,
						lineWidth: this.ctx.lineWidth,
					},
				}),
			)
		}
	}
	static draw(ctx, x, y) {
		ctx.lineTo(x, y)
		ctx.stroke()
	}
}

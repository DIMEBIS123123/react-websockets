import Tool from './Tools'

export default class Eraser extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id)
		this.listen()
		this.ctx.save()
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
	}
	mouseMoveHandler(e) {
		if (this.mouseDown) {
			//this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
			this.socket.send(
				JSON.stringify({
					id: this.id,
					method: 'draw',
					figure: {
						type: 'eraser',
						x: e.pageX - e.target.offsetLeft,
						y: e.pageY - e.target.offsetTop,
						lineWidth: this.ctx.lineWidth,
					},
				}),
			)
		}
	}
	static draw(ctx, x, y, lineWidth) {
		ctx.lineWidth = lineWidth > 1 ? lineWidth : 30
		ctx.strokeStyle = 'white'
		ctx.lineTo(x, y)

		ctx.stroke()
	}
}

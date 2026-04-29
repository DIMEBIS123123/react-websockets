import Tool from './Tools'

export default class Circle extends Tool {
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
					type: 'circle',
					username: this.username,
					x: this.startX,
					y: this.startY,
					id: this.figureId,
					radius: this.radius,
					fillColor: this.ctx.fillStyle,
					strokeColor: this.ctx.strokeStyle,
					lineWidth: this.ctx.lineWidth,
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
					type: 'circle',
					username: this.username,
					x: this.startX,
					y: this.startY,
					id: this.figureId,
					radius: this.radius,
					fillColor: this.ctx.fillStyle,
					strokeColor: this.ctx.strokeStyle,
					lineWidth: this.ctx.lineWidth,
				},
			}),
		)
	}
	mouseDownHandler(e) {
		this.mouseDown = true
		this.ctx.beginPath()
		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop
		this.saved = this.canvas.toDataURL()
		this.figureId = Date.now()
	}
	mouseMoveHandler(e) {
		if (this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft
			let currentY = e.pageY - e.target.offsetTop
			let width = currentX - this.startX
			let height = currentY - this.startY
			this.radius = Math.sqrt(width ** 2 + height ** 2)
			this.draw(this.startX, this.startY, this.radius)
		}
	}
	draw(x, y, r) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.arc(x, y, r, 0, Math.PI * 2)

			this.ctx.stroke()
		}
	}
	static staticDraw(ctx, x, y, r) {
		ctx.beginPath()
		ctx.arc(x, y, r, 0, Math.PI * 2)

		ctx.stroke()
		ctx.beginPath()
	}
}

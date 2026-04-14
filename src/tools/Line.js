import Tool from './Tools'

export default class Line extends Tool {
	constructor(canvas) {
		super(canvas)
		this.listen()
	}
	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
	}
	mouseUpHandler(e) {
		this.mouseDown = false
		this.draw(this.lastX, this.lastY)
	}
	mouseDownHandler(e) {
		this.mouseDown = true

		this.startX = e.pageX - e.target.offsetLeft
		this.startY = e.pageY - e.target.offsetTop

		this.saved = this.canvas.toDataURL()
	}
	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.lastX = e.pageX - e.target.offsetLeft
			this.lastY = e.pageY - e.target.offsetTop
			this.draw(this.lastX, this.lastY)
		}
	}
	draw(x, y) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.moveTo(this.startX, this.startY)
			this.ctx.lineTo(x, y)

			this.ctx.stroke()
		}
	}
}

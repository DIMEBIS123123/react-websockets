import { makeAutoObservable } from 'mobx'
import Line from '../tools/Line'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'

class CanvasState {
	canvas = null
	socket = null
	sessionId = null
	undoList = []
	redoList = []
	username = ''

	constructor() {
		makeAutoObservable(this)
	}

	setUsername(username) {
		this.username = username
	}

	setCanvas(canvas) {
		this.canvas = canvas
	}
	setSocket(socket) {
		this.socket = socket
	}
	setSessionId(id) {
		this.sessionId = id
	}

	pushToUndo(data) {
		this.undoList.push(data)
	}
	pushToRedo(data) {
		this.redoList.push(data)
	}

	clean() {
		let ctx = this.canvas.getContext('2d')

		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	undo() {
		let ctx = this.canvas.getContext('2d')

		if (this.undoList.length > 0) {
			let lastElement
			let currentUserList = this.undoList.filter(item => {
				return item.username == this.username
			})
			if (currentUserList.length > 0) {
				lastElement = currentUserList.pop()
			}

			this.undoList = this.undoList.filter(item => {
				if (item.username !== this.username) {
					return true
				} else {
					if (item.id == lastElement.id) {
						this.redoList.unshift(item)
						return false
					}
				}
				return true
			})
			this.socket.send(
				JSON.stringify({
					id: this.sessionId,
					method: 'draw',
					figure: {
						type: 'undo',
						undoList: this.undoList,
					},
				}),
			)
		}
	}
	redo() {
		let ctx = this.canvas.getContext('2d')
		if (this.redoList.length > 0) {
			let currentFigure = this.redoList[0]
			ctx.beginPath()
			this.redoList.forEach((figure, i) => {
				if (currentFigure.id == figure.id) {
					this.undoList.push(figure)
				}
			})
			this.socket.send(
				JSON.stringify({
					id: this.sessionId,
					method: 'draw',
					figure: {
						type: 'undo',
						undoList: this.undoList,
					},
				}),
			)
			this.redoList = this.redoList.filter(
				(item, i) => currentFigure.id != item.id,
			)
		} else {
		}
	}
	redraw(figure, ctx) {
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

			default:
				break
		}
	}
}

export default new CanvasState()

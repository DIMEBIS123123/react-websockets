import { makeAutoObservable } from 'mobx'

class ToolState {
	tool = null
	settingLineWidth = 1
	settingStrokeColor = 'black'
	settingFillColor = 'black'
	constructor() {
		makeAutoObservable(this)
	}

	setTool(tool) {
		this.tool = tool
	}
	//Прямое изменение контекста канваса
	setFillColor(color) {
		this.tool.fillColor = color
	}

	setStrokeColor(color) {
		this.tool.strokeColor = color
	}
	setLineWidth(width) {
		this.tool.lineWidth = width
	}
	//Сохранение выбранных настроек в состояние
	setSettingFillColor(color) {
		this.settingFillColor = color
	}
	setSettingStrokeColor(color) {
		this.settingStrokeColor = color
	}
	setSettingLineWidth(width) {
		this.settingLineWidth = width
	}
}

export default new ToolState()

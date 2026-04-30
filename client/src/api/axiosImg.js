import axios from 'axios'

export const axiosPost = (canvasRef, paramsId) => {
	axios
		.post(`http://localhost:5000/image?id=${paramsId}`, {
			img: canvasRef.current.toDataURL(),
		})
		.then(response => {})
}
export const axiosCanvasPost = (canvas, paramsId) => {
	axios
		.post(`http://localhost:5000/image?id=${paramsId}`, {
			img: canvas.toDataURL(),
		})
		.then(response => {})
}
export const axiosGet = (canvasRef, paramsId) => {
	axios.get(`http://localhost:5000/image?id=${paramsId}`).then(response => {
		const img = new Image()

		img.src = response.data
		img.onload = () => {
			canvasRef.current
				.getContext('2d')
				.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
			canvasRef.current
				.getContext('2d')
				.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)

			canvasRef.current.getContext('2d').stroke()
		}
	})
}

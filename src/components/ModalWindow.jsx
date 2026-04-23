import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import canvasState from '../store/canvasState'
import { observer } from 'mobx-react-lite'

const ModalWindow = observer(() => {
	const [show, setShow] = useState(true)
	const username = useRef()

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const connectHandler = () => {
		canvasState.setUsername(username.current.value)

		setShow(false)
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Введите ваше имя</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input type='text' placeholder='Дмитрий?' ref={username} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Закрыть
				</Button>
				<Button variant='primary' onClick={connectHandler}>
					Войти
				</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default ModalWindow

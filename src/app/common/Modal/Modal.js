import React, {useRef} from 'react';
import { Button, Modal } from 'react-bootstrap';

import './Modal.scss'

const DetailModal = (props) => {
	let status;

	let taskDescription = useRef(null);
	let taskTitle = React.createRef();

	switch(props.data.status){
		case 'pending': 
			status = 'pendiente';
		break;
		case 'onprocess':
			status = 'en proceso';
		break;
		case 'done':
			status = 'hecha';
		break;
		default:
			status = 'en estado personalizado';
	}

	return (
		<Modal show={props.showModal} onHide={props.toggleModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="bi bi-window"></i> <span ref={taskTitle} contentEditable suppressContentEditableWarning={true}>{ props.data.title }</span>
					<hr />
					<label className="subtitle">Tarea <u>{ status }</u></label>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h3><i className="bi bi-text-left"></i> Descripción</h3>
				<div className="textarea-container">
					<textarea className="textarea" ref={taskDescription} placeholder="Escribe una descripción detallada de la tarea..." defaultValue={ props.data.description }></textarea>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={props.modalDelete}>
					Borrar
				</Button>
				<Button variant="secondary" onClick={props.toggleModal}>
					Cancelar
				</Button>
				<Button variant="primary" onClick={() => {props.modalSave(props.data.id, {
					title: taskTitle.current.innerHTML,
					description: taskDescription.current.value
					})
				}}>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DetailModal;
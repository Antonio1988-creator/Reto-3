import React from 'react';
import { connect } from 'react-redux';

import DetailModal from '../../common/Modal/Modal';
import { taskManagerActions } from '../TaskManager/_actions';

import './TaskCard.scss';

class TaskCard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			showModal: false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.modalSave = this.modalSave.bind(this);
		this.modalDelete = this.modalDelete.bind(this);
	}

	toggleModal(){
		this.setState({
			showModal: !this.state.showModal
		});
	}

	modalSave(id, newTask){
		this.props.updateTask(id, newTask);
		this.toggleModal();
	}

	modalDelete(){
		this.props.deleteTask(this.props.data.id);
	}

	render(){
		return(
			<div>
				<div id={ 'task-' + this.props.data.id} className="task-card-container" onClick={this.toggleModal}>
					<label>{ this.props.data.title }</label>
					{
						(this.props.data.description) ? (
							<div className="has-desc"><i className="bi bi-justify-left"></i></div>
						) : ''
					}
					<div className="floating-icon"><i className="bi bi-pencil-fill"></i></div>
				</div>
				<DetailModal
					data={this.props.data}
					toggleModal={this.toggleModal}
					showModal={this.state.showModal}
					modalSave={this.modalSave}
					modalDelete={this.modalDelete}
				/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteTask: (id) => dispatch(taskManagerActions.deleteTask(id)),
		updateTask: (id, task)  => dispatch(taskManagerActions.updateTask(id, task))
	}
}

export default connect(null, mapDispatchToProps)(TaskCard)
import React from 'react';
import { connect } from 'react-redux';

import { taskManagerActions } from './_actions';

class TaskManager extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			editMode: {
				pending: false,
				onprocess: false,
				done: false
			},
			tasks: []
		}

		this.inputs = {}

		this.props.columns.forEach((column) => {
			this.inputs[column.type] = React.createRef();
		});
	}

	toggleEdit(operation){
		this.setState(prevState => {
			let editMode = Object.assign({}, prevState.editMode);
			editMode[operation] = !editMode[operation];

			return { editMode }
		});
	}

	addTask(task_type){
		if (this.inputs[task_type].current.value !== ''){
			this.props.addTask(this.inputs[task_type].current.value, task_type);
			this.inputs[task_type].current.value = '';
		}
	}

	render(){
		let task_type = this.props.config.task_type;

		return (
			<div>
				{
					(!this.state.editMode[task_type]) ? 
						(
							<button className="button-add-task" onClick={() => { this.toggleEdit(task_type) }}>
								<i className="bi bi-plus-lg"></i> Añadir nueva tarea
							</button>
						) : (
							<div className="editor-container">
								<div className="textarea-container">
									<textarea className="textarea" placeholder="Escribe el título de la tarea..." ref={ this.inputs[task_type] }></textarea>
								</div>
								<button className="button-add-column" onClick={() => { this.addTask(task_type) }}>Añadir tarea</button>
								<div className="cancel" onClick={() => { this.toggleEdit(task_type) }}><i className="bi bi-x-lg"></i></div>
							</div>
						)
				}
			</div>
		)
	}
}

const mapsStateToProps = (state) => {
	return {
		tasks: state.taskManager.tasks,
		columns: state.columnManager.columns
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (title, status) => dispatch(taskManagerActions.addTask(title, status))
	}
}

export default connect(mapsStateToProps, mapDispatchToProps)(TaskManager);

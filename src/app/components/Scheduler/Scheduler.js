import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TaskColumn from '../TaskColumn/TaskColumn';

import './Scheduler.scss';
import { schedulerActions } from './_actions';
import { taskManagerActions } from '../TaskManager/_actions';

const reorder = (list, startIndex, endIndex) => {
	 const result = Array.from(list);
	 const [removed] = result.splice(startIndex, 1);
	 result.splice(endIndex, 0, removed);

	 return result;
}

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);
  
	destClone.splice(droppableDestination.index, 0, removed);
  
	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;
  
	return result;
};

class Scheduler extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			columnEditorActive: false
		}

		this.columnName = React.createRef();

		this.toggleColumnEditor = this.toggleColumnEditor.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	toggleColumnEditor(){
		this.setState({
			...this.state,
			columnEditorActive: !this.state.columnEditorActive
		});
	}

	onDragEnd(result){
		// Dropped outside of droppable area
		if (!result.destination) {
			return;
		}

		if (result.destination.droppableId === result.source.droppableId) {
			 const tasks = reorder(
				this.props.tasks,
				result.source.index,
				result.destination.index
			);

			this.props.reorderTasks(tasks);
		} else {
			let newStatus = this.props.columns.find((column) => {
				return column.id === result.destination.droppableId
			}).type || '';

			const id = parseInt(result.draggableId.split('task-')[1]);

			this.props.updateTaskStatus(id, newStatus);
			move(this.props.tasks, this.props.tasks, result.source, result.destination);
		}
	}

	render(){
		return(
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="scheduler-container">
					{
						this.props.columns.map((column, index) => (
							<Droppable key={index} droppableId={column.id}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										<TaskColumn key={index} id={column.id} title={column.name} removable={column.removable} column_type={column.type} />
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						))
					}
					<div className="add-column">
						{
							(!this.state.columnEditorActive) ? (
								<div onClick={this.toggleColumnEditor}>
									<i className="bi bi-plus-lg"></i> <span>Añadir otra columna</span>
								</div>
							) : (
								<div className="editor-container">
									<div className="textarea-container">
										<textarea className="textarea" placeholder="Escribe el nombre de la columna..." ref={  this.columnName }></textarea>
									</div>
									<button className="button-add-column" onClick={ () => { this.props.addColumn(this.columnName.current.value) }}>Añadir columna</button>
									<div className="cancel" onClick={this.toggleColumnEditor}><i className="bi bi-x-lg"></i></div>
								</div>
							)
						}
					</div>
				</div>
			</DragDropContext>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.taskManager.tasks,
		columns: state.columnManager.columns
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addColumn: (name) => dispatch(schedulerActions.addColumn(name)),
		updateTaskStatus: (id, status) => dispatch(taskManagerActions.updateTaskStatus(id, status)),
		reorderTasks: (tasks) => dispatch(taskManagerActions.reorderTasks(tasks))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
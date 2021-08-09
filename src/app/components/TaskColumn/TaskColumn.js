import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import TaskManager from '../TaskManager/TaskManager'
import TaskCard from '../TaskCard/TaskCard'
import { schedulerActions } from '../Scheduler/_actions'

import './TaskColumn.scss';

class TaskColumn extends React.Component{
	constructor(props){
		super(props);

		this.columnTitle = React.createRef();
	}

	render(){
		return (
			<div className={`scheduler-col ${this.props.column_type}-task`}>
				<h2
					contentEditable={this.props.removable}
					onBlur={() => { this.props.updateColumn(this.props.id, this.columnTitle.current.innerHTML) }}
					ref={this.columnTitle} suppressContentEditableWarning={true}
				>{ this.props.title }</h2>
				{
					(this.props.removable) ? (
						<div className="remove-col" onClick={() => { this.props.deleteColumn(this.props.id) }}>
							<i className="bi bi-trash"></i>
						</div>
					) : ''
				}
				<div className="task-container">
					{
						this.props.tasks.map((task, i) => {
							if(task.status === this.props.column_type){
								return (
									<Draggable key={task.id} draggableId={'task-' + task.id} index={i}>
                      					{(provided) => (
                        					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
												<TaskCard data={task} />
											</div>
										)}
									</Draggable>
								)
							}

							return null;
						})
					}
				</div>
				<TaskManager config={{task_type: this.props.column_type}} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.taskManager.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteColumn: (id) => dispatch(schedulerActions.deleteColumn(id)),
		updateColumn: (id, name) => dispatch(schedulerActions.updateColumn(id, name))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskColumn);
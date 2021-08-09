import { SCHEDULER_CONST } from '../../../const';

const addTask = (title, status) => {
	return {
		type: SCHEDULER_CONST.ADD_TASK,
		title,
		status
	}
};

const deleteTask = (id) => {
	return {
		type: SCHEDULER_CONST.REMOVE_TASK,
		id
	}
};

const reorderTasks = (tasks) => {
	return {
		type: SCHEDULER_CONST.REORDER_TASK,
		tasks
	}
};

const updateTaskStatus = (id, status) => {
	return {
		type: SCHEDULER_CONST.UPDATE_TASK_STATUS,
		id,
		status
	}
};

const updateTask = (id, task) => {
	return {
		type: SCHEDULER_CONST.UPDATE_TASK,
		id,
		task
	}
};

export const taskManagerActions = {
	addTask,
	deleteTask,
	reorderTasks,
	updateTask,
	updateTaskStatus
}
import { SCHEDULER_CONST } from '../../../const';

const  addColumn = (name) => {
	return {
		type: SCHEDULER_CONST.ADD_COLUMN,
		name
	}
}

const deleteColumn = (id) => {
	return {
		type: SCHEDULER_CONST.REMOVE_COLUMN,
		id
	}
}

const updateColumn = (id, name) => {
	return {
		type: SCHEDULER_CONST.UPDATE_COLUMN,
		id,
		name
	}
}

export const schedulerActions = {
	addColumn,
	deleteColumn,
	updateColumn
}
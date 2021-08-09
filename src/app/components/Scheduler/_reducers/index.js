import { SCHEDULER_CONST } from '../../../const';

const initialState = {
	columns: [
		{
			id: 'droppable1',
			name: 'Lista de tareas',
			type: 'pending'
		},
		{
			id: 'droppable2',
			name: 'En proceso',
			type: 'onprocess'
		},
		{
			id: 'droppable3',
			name: 'Hecho',
			type: 'done'
		}
	]
};

export const columnManager = (state = initialState, action) => {
	switch(action.type){
		case SCHEDULER_CONST.ADD_COLUMN:
			let newColumn = {
				id: 'droppable' + (state.columns.length + 1),
				name: action.name,
				type: action.name.toLowerCase().replaceAll(' ', ''),
				removable: true
			}

			return Object.assign({}, state, {
				columns: [...state.columns, newColumn]
			});

		case SCHEDULER_CONST.REMOVE_COLUMN:
			return Object.assign({}, state, {
				columns: state.columns.filter((item) => item.id !== action.id)
			});

		case SCHEDULER_CONST.UPDATE_COLUMN:
			let columns = state.columns.map((col) => {
				if (col.id === action.id) {
					return {
						...col,
						name: action.name
					}
				}

				return col;
			});

			return Object.assign({}, state, {
				columns
			});

		default:
			return state;
	}
}
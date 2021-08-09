import { SCHEDULER_CONST } from '../../../const';

const initialState = {
	tasks: []
}

export const taskManager = (state = initialState, action) => {
	let tasks;

	switch(action.type){
		case SCHEDULER_CONST.ADD_TASK:
			let newTask = {
				id: (state.tasks.length) + 1,
				title: action.title,
				status: action.status,
				description: ''
			};

			return Object.assign({}, state, {
				tasks: [...state.tasks, newTask]
			});
		
		case SCHEDULER_CONST.REMOVE_TASK:
			return Object.assign({}, state, {
				tasks: state.tasks.filter((item) => item.id !== action.id)
			});

		case SCHEDULER_CONST.REORDER_TASK:
			 return Object.assign({}, state, {
				 tasks: action.tasks
			 })

		case SCHEDULER_CONST.UPDATE_TASK_STATUS:
			tasks = state.tasks.map((task) => {
				if (task.id === action.id) {
					return {
						...task,
						status: action.status
					}
				}

				return task;
			});

			return Object.assign({}, state, {
				tasks
			})
		
		case SCHEDULER_CONST.UPDATE_TASK:
			tasks = state.tasks.map((task) => {
				if (task.id === action.id) {
					return {
						...task,
						title: action.task.title,
						description: action.task.description
					}
				}

				return task;
			});

			return Object.assign({}, state, {
				tasks
			})

		default: 
			return state;
	}
}
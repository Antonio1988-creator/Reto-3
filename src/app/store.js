import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { columnManager }  from './components/Scheduler/_reducers'
import { taskManager }  from './components/TaskManager/_reducers'

export const store = configureStore({
	reducer: combineReducers({
		columnManager,
		taskManager
	})
});
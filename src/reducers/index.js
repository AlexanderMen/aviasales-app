import { combineReducers } from 'redux';

import searchId from './searchId';
import tickets from './tickets';
import error from './error';
import ticketsLoaded from './ticketsLoaded';

export default combineReducers({
	error,
	ticketsLoaded,
	searchId,
	tickets,
});

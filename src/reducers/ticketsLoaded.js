import { TICKETS_LOADED } from '../actions';

const ticketsLoaded = (state = false, action) => {
	switch (action.type) {
		case TICKETS_LOADED:
			return true;
		default:
			return state;
	}
};

export default ticketsLoaded;

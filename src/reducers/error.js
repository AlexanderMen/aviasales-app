const error = (state = false, action) => {
	switch (action.type) {
		case 'SHOW_ERROR_MESSAGE':
			return true;
		default:
			return state;
	}
};

export default error;

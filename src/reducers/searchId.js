const searchId = (state = '', action) => {
	switch (action.type) {
		case 'GET_SEARCH_ID':
			return action.searchId;
		default:
			return state;
	}
};

export default searchId;

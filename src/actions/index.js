export const changeSortItem = (id) => ({
	type: 'CHANGE_SORT_ITEM',
	id,
});

export const changeFilterItem = (id) => ({
	type: 'CHANGE_FILTER_ITEM',
	id,
});

export const showNext5Tickets = () => ({ type: 'SHOW_NEXT_5_TICKETS' });

const getSearchId = (searchId) => ({
	type: 'GET_SEARCH_ID',
	searchId,
});

const getTickets = (tickets) => ({
	type: 'GET_TICKETS',
	tickets,
});

const isTicketsLoaded = (ticketsLoaded) => ({
	type: 'TICKETS_LOADED',
	ticketsLoaded,
});

const showErrorMessage = () => ({ type: 'SHOW_ERROR_MESSAGE' });

export const fetchSearchId = () => async (dispatch) => {
	try {
		const response = await fetch('https://aviasales-test-api.kata.academy/search');
		const json = await response.json();
		return dispatch(getSearchId(json.searchId));
	} catch (err) {
		dispatch(showErrorMessage());
	}
};

export const fetchTickets = () => async (dispatch, getState) => {
	try {
		const searchId = getState().searchId;
		const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`;
		let response = await fetch(url);

		while (response.status === 500) response = await fetch(url);

		const json = await response.json();
		if (json.stop) {
			console.log('stop: true');
			return dispatch(isTicketsLoaded(true));
		}
		dispatch(getTickets(json.tickets));
		return dispatch(fetchTickets());
	} catch (err) {
		dispatch(showErrorMessage());
	}
};

export const filtersId = ['all', '0', '1', '2', '3'];

export default class AviasalesService {
	async fetchingSearchId(dispatch, getSearchId, showErrorMessage) {
		try {
			const response = await fetch('https://aviasales-test-api.kata.academy/search');
			const json = await response.json();
			return dispatch(getSearchId(json.searchId));
		} catch (err) {
			dispatch(showErrorMessage());
		}
	}

	async fetchingTickets(dispatch, getState, isTicketsLoaded, getTickets, showErrorMessage, fetchTickets) {
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
	}
}

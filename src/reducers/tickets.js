import { filtersId, GET_TICKETS, SHOW_NEXT_5_TICKETS, CHANGE_FILTER_ITEM, CHANGE_SORT_ITEM } from '../actions';

import { getFilteredTickets, getFilteredAndSortedTickets, getShowingTickets, getFilters } from './functionsForRedusers';

const tickets = (
	state = {
		filters: ['0 stops', '1 stop', '2 stops'],
		sortID: 1,
		totalTickets: [],
		filteredTickets: [],
		filteredAndSortedTickets: [],
		showingTickets: [],
		showingTicketsNumber: 5,
	},
	action
) => {
	let {
		filters,
		sortID,
		totalTickets,
		filteredTickets,
		filteredAndSortedTickets,
		showingTickets,
		showingTicketsNumber,
	} = state;

	switch (action.type) {
		case GET_TICKETS: {
			const newTotalTickets = [...totalTickets, ...action.tickets];
			const newFilteredTickets = getFilteredTickets(newTotalTickets, filters);
			const newFilteredAndSortedTickets = getFilteredAndSortedTickets(newFilteredTickets, sortID);

			const newShowingTickets = getShowingTickets(newFilteredAndSortedTickets, showingTickets, showingTicketsNumber);

			return {
				filters: [...filters],
				sortID,
				totalTickets: newTotalTickets,
				filteredTickets: newFilteredTickets,
				filteredAndSortedTickets: newFilteredAndSortedTickets,
				showingTickets: newShowingTickets,
				showingTicketsNumber,
			};
		}
		case SHOW_NEXT_5_TICKETS: {
			const newShowingTicketsNumber = showingTicketsNumber + 5;
			const newShowingTickets = getShowingTickets(
				filteredAndSortedTickets,
				showingTickets,
				newShowingTicketsNumber,
				true
			);

			return {
				filters: [...filters],
				sortID,
				totalTickets: [...totalTickets],
				filteredTickets: [...filteredTickets],
				filteredAndSortedTickets: [...filteredAndSortedTickets],
				showingTickets: newShowingTickets,
				showingTicketsNumber: newShowingTicketsNumber,
			};
		}
		case CHANGE_FILTER_ITEM: {
			let newState = { ...state };
			const { id } = action;
			newState.filters = getFilters(filters, id, filtersId);
			newState.showingTickets = [];
			newState.showingTicketsNumber = 5;

			newState.filteredTickets = getFilteredTickets(totalTickets, newState.filters);
			newState.filteredAndSortedTickets = getFilteredAndSortedTickets(newState.filteredTickets, sortID);

			newState.showingTickets = getShowingTickets(
				newState.filteredAndSortedTickets,
				newState.showingTickets,
				newState.showingTicketsNumber
			);

			return newState;
		}
		case CHANGE_SORT_ITEM:
			filteredAndSortedTickets = getFilteredAndSortedTickets(filteredTickets, action.id);

			showingTickets = getShowingTickets(filteredAndSortedTickets, showingTickets, showingTicketsNumber);

			return { ...state, ...{ sortID: action.id }, filteredAndSortedTickets, showingTickets };

		default:
			return state;
	}
};

export default tickets;

import { filtersId } from '../actions';

const tickets = (
	state = {
		filters: ['0', '1', '2'],
		sortID: 1,
		totalTickets: [],
		filteredTickets: [],
		filteredAndSortedTickets: [],
		showingTickets: [],
		showingTicketsNumber: 5,
	},
	action
) => {
	const getFilteredTickets = (totalTickets, filters) => {
		if (!filters.length) return [];
		if (filters.length === 5) return [...totalTickets];

		return totalTickets.filter((ticket) => {
			return (
				filters.includes(`${ticket.segments[0].stops.length}`) && filters.includes(`${ticket.segments[1].stops.length}`)
			);
		});
	};

	const getFilteredAndSortedTickets = (filteredTickets, sortID) => {
		const comparingFn = (a, b, sortID) => {
			const firstElPrice = a.price;
			const secondElPrice = b.price;
			const firstElDuration = a.segments[0].duration + a.segments[1].duration;
			const secondElDuration = b.segments[0].duration + b.segments[1].duration;

			if (sortID === 1) return firstElPrice - secondElPrice;
			if (sortID === 2) return firstElDuration - secondElDuration;
			return firstElPrice * firstElDuration - secondElPrice * secondElDuration;
		};

		return [...filteredTickets].sort((a, b) => comparingFn(a, b, sortID));
	};

	const getShowingTickets = (tickets, showingTickets, ticketsNumber, next5Tickets) => {
		if (ticketsNumber === 5) return tickets.slice(0, 5);
		if (!next5Tickets) return tickets.slice(0, showingTickets.length);

		return [...showingTickets, ...tickets.slice(showingTickets.length, showingTickets.length + 5)];
	};

	const getFilters = (filters, id, filtersId) => {
		let itemsId = [...filters];
		const stateHasAllItemsId = itemsId.length === 5;

		if (id === 'all') return stateHasAllItemsId ? [] : [...filtersId];

		if (stateHasAllItemsId) return itemsId.filter((item) => item !== 'all' && item !== id);

		if (itemsId.includes(id)) return itemsId.filter((item) => item !== id);

		itemsId.push(id);
		return itemsId.length === 4 ? [...filtersId] : itemsId;
	};

	let {
		filters,
		sortID,
		totalTickets,
		filteredTickets,
		filteredAndSortedTickets,
		showingTickets,
		showingTicketsNumber,
	} = state;
	let newShowingTickets;

	switch (action.type) {
		case 'GET_TICKETS': {
			const newTotalTickets = [...totalTickets, ...action.tickets];
			const newFilteredTickets = getFilteredTickets(newTotalTickets, filters);
			const newFilteredAndSortedTickets = getFilteredAndSortedTickets(newFilteredTickets, sortID);

			newShowingTickets = getShowingTickets(newFilteredAndSortedTickets, showingTickets, showingTicketsNumber);

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
		case 'SHOW_NEXT_5_TICKETS': {
			const newShowingTicketsNumber = showingTicketsNumber + 5;
			newShowingTickets = getShowingTickets(filteredAndSortedTickets, showingTickets, newShowingTicketsNumber, true);

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
		case 'CHANGE_FILTER_ITEM': {
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
		case 'CHANGE_SORT_ITEM':
			filteredAndSortedTickets = getFilteredAndSortedTickets(filteredTickets, action.id);

			showingTickets = getShowingTickets(filteredAndSortedTickets, showingTickets, showingTicketsNumber);

			return { ...state, ...{ sortID: action.id }, filteredAndSortedTickets, showingTickets };

		default:
			return state;
	}
};

export default tickets;

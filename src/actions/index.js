import AviasalesService from '../services/AviasalesService';

const aviasalesService = new AviasalesService();

export const CHANGE_SORT_ITEM = 'CHANGE_SORT_ITEM';
export const CHANGE_FILTER_ITEM = 'CHANGE_FILTER_ITEM';
export const SHOW_NEXT_5_TICKETS = 'SHOW_NEXT_5_TICKETS';
export const GET_SEARCH_ID = 'GET_SEARCH_ID';
export const GET_TICKETS = 'GET_TICKETS';
export const TICKETS_LOADED = 'TICKETS_LOADED';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export const changeSortItem = (id) => ({
	type: CHANGE_SORT_ITEM,
	id,
});

export const changeFilterItem = (id) => ({
	type: CHANGE_FILTER_ITEM,
	id,
});

export const showNext5Tickets = () => ({ type: SHOW_NEXT_5_TICKETS });

const getSearchId = (searchId) => ({
	type: GET_SEARCH_ID,
	searchId,
});

const getTickets = (tickets) => ({
	type: GET_TICKETS,
	tickets,
});

const isTicketsLoaded = (ticketsLoaded) => ({
	type: TICKETS_LOADED,
	ticketsLoaded,
});

const showErrorMessage = () => ({ type: SHOW_ERROR_MESSAGE });

export const fetchSearchId = () => (dispatch) =>
	aviasalesService.fetchingSearchId(dispatch, getSearchId, showErrorMessage);

export const fetchTickets = () => (dispatch, getState) =>
	aviasalesService.fetchingTickets(dispatch, getState, isTicketsLoaded, getTickets, showErrorMessage, fetchTickets);

export const filtersId = [
	{
		name: 'Все',
		id: 'all',
	},
	{
		name: 'Без пересадок',
		id: '0 stops',
	},
	{
		name: '1 пересадка',
		id: '1 stop',
	},
	{
		name: '2 пересадки',
		id: '2 stops',
	},
	{
		name: '3 пересадки',
		id: '3 stops',
	},
];

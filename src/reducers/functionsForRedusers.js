export const getFilteredTickets = (totalTickets, filters) => {
	if (!filters.length) return [];
	if (filters.length === 5) return [...totalTickets];

	return totalTickets.filter((ticket) => {
		let isMatch = false;
		filters.forEach((item) => {
			if (item[0] === `${ticket.segments[0].stops.length}` && item[0] === `${ticket.segments[1].stops.length}`)
				isMatch = true;
		});
		return isMatch;
	});
};

export const getFilteredAndSortedTickets = (filteredTickets, sortID) => {
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

export const getShowingTickets = (tickets, showingTickets, ticketsNumber, next5Tickets) => {
	if (ticketsNumber === 5) return tickets.slice(0, 5);
	if (!next5Tickets) return tickets.slice(0, showingTickets.length);

	return [...showingTickets, ...tickets.slice(showingTickets.length, showingTickets.length + 5)];
};

export const getFilters = (filters, id, filtersId) => {
	const newFiltersId = filtersId.map((item) => item.id);
	let itemsId = [...filters];
	const stateHasAllItemsId = itemsId.length === 5;

	if (id === 'all') return stateHasAllItemsId ? [] : newFiltersId;

	if (stateHasAllItemsId) return itemsId.filter((item) => item !== 'all' && item !== id);

	if (itemsId.includes(id)) return itemsId.filter((item) => item !== id);

	itemsId.push(id);
	return itemsId.length === 4 ? newFiltersId : itemsId;
};

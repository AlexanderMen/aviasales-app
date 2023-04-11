import React from 'react';
import { add, format } from 'date-fns';
import { connect } from 'react-redux';

import { showNext5Tickets } from '../../actions';
import Ticket from '../Ticket';

import classes from './TicketsList.module.scss';

const TicketsList = ({ tickets, showNext5Tickets }) => {
	const { filters, showingTickets } = tickets;
	if (!filters.length)
		return (
			<div className={classes['no-filters-checked']}>
				<span>Рейсов, подходящих под заданные фильтры, не найдено...</span>
			</div>
		);

	const ticketsList = showingTickets.map((ticket) => {
		const { price, carrier, segments } = ticket;
		const id = `${price}${carrier}${segments[0].date}`;
		let ticketPrice = String(price);
		ticketPrice = `${ticketPrice.slice(0, ticketPrice.length - 3)} ${ticketPrice.slice(ticketPrice.length - 3)} Р`;

		const getDestinationTime = (date, duration) =>
			add(date, {
				years: 0,
				months: 0,
				weeks: 0,
				days: 0,
				hours: 0,
				minutes: duration,
				seconds: 0,
			});

		const getFlightDuration = (duration) => {
			const hours = Math.floor(duration / 60);
			const minutes = duration % 60;
			return `${hours < 10 ? '0' + hours : hours}ч ${minutes < 10 ? '0' + minutes : minutes}м`;
		};

		const originTimeTo = new Date(segments[0].date);
		const destinationTimeTo = getDestinationTime(originTimeTo, segments[0].duration);
		const durationTo = getFlightDuration(segments[0].duration);

		const originTimeBack = new Date(segments[1].date);
		const destinationTimeBack = getDestinationTime(originTimeBack, segments[1].duration);
		const durationBack = getFlightDuration(segments[1].duration);

		return (
			<Ticket
				key={id}
				price={ticketPrice}
				airlineLogo={`http://pics.avs.io/99/36/${carrier}.png`}
				originTo={segments[0].origin}
				destinationTo={segments[0].destination}
				originTimeTo={format(originTimeTo, 'HH:mm')}
				destinationTimeTo={format(destinationTimeTo, 'HH:mm')}
				durationTo={durationTo}
				stopsTo={segments[0].stops}
				originBack={segments[1].origin}
				destinationBack={segments[1].destination}
				originTimeBack={format(originTimeBack, 'HH:mm')}
				destinationTimeBack={format(destinationTimeBack, 'HH:mm')}
				durationBack={durationBack}
				stopsBack={segments[1].stops}
			/>
		);
	});

	return (
		<div className={classes['tickets-list']}>
			{ticketsList}
			<div className={classes['tickets-list__btn-container']}>
				<button type="button" className={classes['tickets-list__btn']} onClick={() => showNext5Tickets(filters)}>
					ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = ({ tickets }) => ({ tickets });

export default connect(mapStateToProps, { showNext5Tickets })(TicketsList);

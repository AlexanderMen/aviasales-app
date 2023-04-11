import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { fetchSearchId, fetchTickets } from '../../actions';
import ErrorMessage from '../ErrorMessage';
import Filters from '../Filters';
import Sort from '../Sort';
import TicketsList from '../TicketsList';

import classes from './App.module.scss';

const App = ({ isErrorMessage, ticketsLoaded, fetchSearchId, fetchTickets }) => {
	useEffect(() => () => fetchSearchId().then(() => fetchTickets()), []);

	const err = (
		<section className={classes.mainWrapper}>
			<ErrorMessage message="Something goes wrong..." description="Something goes wrong, try again later..." />
		</section>
	);

	const content = (
		<section className={classes.mainWrapper}>
			<section className={classes.filtersWrapper}>
				<Filters />
			</section>
			<section className={classes.sortTicketsWrapper}>
				<Sort />
				<TicketsList />
			</section>
		</section>
	);

	return (
		<div className={classes.mainBackground}>
			<div className={classes.planeLogo}>
				<img src="images/planeLogo.png" alt="plane logo" />
				{ticketsLoaded || isErrorMessage ? null : (
					<Spin size="large" tip="Loading tickets..." className={classes.spinner} />
				)}
			</div>
			{isErrorMessage ? err : content}
		</div>
	);
};

const mapStateToProps = ({ error, ticketsLoaded }) => ({ isErrorMessage: error, ticketsLoaded });

export default connect(mapStateToProps, { fetchSearchId, fetchTickets })(App);

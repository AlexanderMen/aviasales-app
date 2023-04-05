import React from 'react';
import { Row, Col } from 'antd';

import classes from './Ticket.module.scss';

const Ticket = ({
	price,
	airlineLogo,
	originTo,
	destinationTo,
	originTimeTo,
	destinationTimeTo,
	durationTo,
	stopsTo,
	originBack,
	destinationBack,
	originTimeBack,
	destinationTimeBack,
	durationBack,
	stopsBack,
}) => {
	const stopsNumber = (stops) => {
		if (!stops.length) return '0 ПЕРЕСАДОК';
		const str = stops.length === 1 ? 'ПЕРЕСАДКА' : 'ПЕРЕСАДКИ';
		return `${stops.length} ${str}`;
	};

	return (
		<div className={classes.ticket}>
			<Row className={classes.ticket__header}>
				<Col className={classes.ticket__header_price} span={8}>
					{price}
				</Col>
				<Col span={8} offset={8} className={classes.ticket__header_logo}>
					<img src={airlineLogo} alt="airline logo" />
				</Col>
			</Row>
			<Row className={classes['ticket__to']}>
				<Col className={classes['ticket_gray-header']} span={8}>
					{originTo} - {destinationTo}
				</Col>
				<Col className={classes['ticket_gray-header']} span={8}>
					В ПУТИ
				</Col>
				<Col className={classes['ticket_gray-header']} span={8}>
					{stopsNumber(stopsTo)}
				</Col>
				<Col span={8}>
					{originTimeTo} - {destinationTimeTo}
				</Col>
				<Col span={8}>{durationTo}</Col>
				<Col span={8}>{stopsTo.join(', ')}</Col>
			</Row>
			<Row className={classes['ticket__back']}>
				<Col className={classes['ticket_gray-header']} span={8}>
					{originBack} - {destinationBack}
				</Col>
				<Col className={classes['ticket_gray-header']} span={8}>
					В ПУТИ
				</Col>
				<Col className={classes['ticket_gray-header']} span={8}>
					{stopsNumber(stopsBack)}
				</Col>
				<Col span={8}>
					{originTimeBack} - {destinationTimeBack}
				</Col>
				<Col span={8}>{durationBack}</Col>
				<Col span={8}>{stopsBack.join(', ')}</Col>
			</Row>
		</div>
	);
};

export default Ticket;

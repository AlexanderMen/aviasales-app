import React from 'react';
import { connect } from 'react-redux';

import { changeFilterItem } from '../../actions';

import classes from './Filters.module.scss';

const Filters = ({ changeFilterItem, filtersItemChecked }) => {
	const filterItems = [
		{
			name: 'Все',
			id: 'all',
		},
		{
			name: 'Без пересадок',
			id: '0',
		},
		{
			name: '1 пересадка',
			id: '1',
		},
		{
			name: '2 пересадки',
			id: '2',
		},
		{
			name: '3 пересадки',
			id: '3',
		},
	];

	const filterItemsList = filterItems.map((item) => {
		const { name, id } = item;
		const isChecked = Boolean(filtersItemChecked.find((item) => item === id));

		return (
			<li className={classes.filters__item} key={id}>
				<input
					className={classes['filters__item-input']}
					type="checkbox"
					name="filters"
					id={id}
					onChange={() => changeFilterItem(id)}
					checked={isChecked}
				/>
				<label className={classes['filters__item-label']} htmlFor={id}>
					{name}
				</label>
			</li>
		);
	});

	return (
		<section className={classes.filters}>
			<div className={classes.filters__wrapper}>
				<h2 className={classes.filters__header}>Количество пересадок</h2>
				<ul className={classes.filters__list}>{filterItemsList}</ul>
			</div>
		</section>
	);
};

const mapStateToProps = ({ tickets }) => ({ filtersItemChecked: tickets.filters });

export default connect(mapStateToProps, { changeFilterItem })(Filters);

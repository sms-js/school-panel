
import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DatePickers from './DatePickers';

function SearchBar({ sendSearchData }) {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [searchString, setInputValue] = useState('');
	const [date, setDate] = useState({ startDate: '', endDate: '' });

	const styles = {
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'nowrap',
			justifyContent: 'space-between',
			flexDirection: 'row'
		},
		input: {
			marginLeft: 8,
			flex: 1
		},
		iconButton: {
			padding: 1
		},
		divider: {
			width: 1,
			height: 28,
			margin: 4
		}
	};

	const handleClick = () => {
		sendSearchData({ searchString, date });
	};

	function handleToggle() {
		setOpen(prevOpen => !prevOpen);
	}

	function handleClose(event) {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	}

	const getData = info => {
		let oldDate = { startDate: date.startDate, endDate: date.endDate };
		let updatedDate = { ...oldDate };
		updatedDate[info.target.id] = info.target.value;
		setDate(Object.assign(oldDate, updatedDate));
	};

	const handleInputSearchField = () => {
		return event => {
			setInputValue(event.target.value);
			if (event.which == 13) {
				sendSearchData({ searchString, date });
			}
		};
	};

	return (
		<Paper style={styles.root}>
			<IconButton
				ref={anchorRef}
				aria-owns={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<MenuIcon />
			</IconButton>
			{open ? (
				<ClickAwayListener onClickAway={handleClose}>
					<div style={styles.root}>
						<DatePickers sendData={getData} name="startDate" labelName="Start Date" startingValue={date.startDate} />
						<DatePickers sendData={getData} name="endDate" labelName="End Date" startingValue={date.endDate} />
					</div>
				</ClickAwayListener>
			) : null}

			<InputBase
				style={styles.input}
				placeholder="Search"
				onChange={handleInputSearchField('searchField')}
				onKeyDown={handleInputSearchField('searchField')}
				id="searchField"
			/>

			<Divider style={styles.divider} />
			<IconButton style={styles.iconButton} aria-label="Search" onClick={handleClick}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}

export default SearchBar;

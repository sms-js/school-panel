import React, { useState } from 'react';
import PopOverMenu from './PopOverMenu';
import classes from './SearchBar.module.css';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterListRounded from '@material-ui/icons/FilterListRounded';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ sendSearchData }) {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [searchString, setInputValue] = useState('');
	const [date, setDate] = useState({ startDate: '', endDate: '' });
	const [anchorEl, setAnchorEl] = useState(null);
	const [iconColor, setIconColor] = useState('action')
	
	const handleSearchClick = () => {
		sendSearchData({ searchString, date });
	};

	const getData = info => {
		let oldDate = { startDate: date.startDate, endDate: date.endDate };
		let updatedDate = { ...oldDate };
		updatedDate[info.target.id] = info.target.value;
		setDate(Object.assign(oldDate, updatedDate));
		const checkDate = info.target.id == 'startDate' ? 'endDate' : 'startDate';
		const newIconColor = (info.target.value == ''&& date[checkDate]=='') ? 'action' : 'secondary';
		setIconColor(newIconColor);
	};

	const handleInputSearchField = () => {
		return event => {
			setInputValue(event.target.value);
			if (event.which == 13) {
				sendSearchData({ searchString, date });
			}
		};
	};

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}
	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<div>
			<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder="Search"
					onChange={handleInputSearchField('searchField')}
					onKeyDown={handleInputSearchField('searchField')}
					id="searchField"
				/>
				<Divider className={classes.divider} />
				<IconButton className={classes.iconButton} aria-label="Search" onClick={handleSearchClick}>
					<SearchIcon />
				</IconButton>
				<Divider className={classes.divider} />
				<IconButton
					ref={anchorRef}
					aria-owns={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleClick}
					aria-controls="simple-menu"
					aria-haspopup="true"
				>
					<FilterListRounded color={iconColor}/>
				</IconButton>
			</Paper>
			<PopOverMenu getData={getData} anchorEl={anchorEl} handleClose={handleClose} />
		</div>
	);
}

export default SearchBar;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import WCIcon from '@material-ui/icons/Wc';
import CheckCircle from '@material-ui/icons/CheckCircle';
import OfflineBolt from '@material-ui/icons/OfflineBolt';


const Bar = ({ value, handleChange }) => {
	return (
		<AppBar position="static" color="default">
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="on"
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab label="Student" icon={<ChildCareIcon />} />
				<Tab label="Parents" icon={<WCIcon />} />
				<Tab label="Health" icon={<FavoriteIcon />} />
				<Tab label="Contact Numbers" icon={<PhoneIcon />} />
				<Tab label="Authorizations" icon={<CheckCircle />} />
				<Tab label="Emergency" icon={<OfflineBolt />} />

			</Tabs>
		</AppBar>
	);
};

export default Bar;
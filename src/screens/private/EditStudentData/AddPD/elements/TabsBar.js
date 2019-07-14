import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DrawerContainer from 'components/DrawerContainer';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import CheckCircle from '@material-ui/icons/CheckCircle';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Typography from '@material-ui/core/Typography';



const TabsBar = ({ value, handleChange }) => {
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
				<Tab label="Personal Data" icon={<PersonPinIcon />} />
				<Tab label="Health Data" icon={<FavoriteIcon />} />
				<Tab label="Contact Numbers" icon={<PhoneIcon />} />
				<Tab label="Authorizations" icon={<CheckCircle />} />
				<Tab label="Emergency" icon={<OfflineBolt />} />

			</Tabs>
		</AppBar>
	);
};

export default TabsBar;
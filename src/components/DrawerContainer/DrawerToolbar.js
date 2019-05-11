import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SessionContext from 'components/SessionContext';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from 'components/icons/SettingsIcon';
import PowerIcon from 'components/icons/PowerIcon';
import ProfileIcon from 'components/icons/ProfileIcon';

const DrawerToolbar = ({ classes, title, handleDrawerToggle }) => {
	const session = useContext(SessionContext.context);

	const [anchorEl, setAnchorEl] = useState(null);
	const toogleMenu = ev => setAnchorEl(anchorEl ? null : ev.currentTarget);

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit" noWrap>
					{title}
				</Typography>
				<IconButton color="inherit" aria-label="Open menu" onClick={toogleMenu} className={classes.configButton}>
					<SettingsIcon />
				</IconButton>
				<Menu id="config-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={toogleMenu}>
					<ListItem component={Link} to="/admin/profile" key="profile">
						<ProfileIcon />
						<ListItemText primary="Profile" />
					</ListItem>
					<ListItem button onClick={() => session.logout()} key="Logout">
						<PowerIcon />
						<ListItemText primary="Logout" />
					</ListItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

DrawerToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	handleDrawerToggle: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
};

export default DrawerToolbar;

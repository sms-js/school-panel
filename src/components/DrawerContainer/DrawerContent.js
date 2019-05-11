import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from 'components/icons/HomeIcon';
import FaceIcon from 'components/icons/FaceIcon';
import MessageIcon from 'components/icons/MessageIcon';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const DrawerContent = classes => (
	<div>
		<div className={classes.toolbar} />
		<Divider />
		<List>
			<ListItem component={Link} to="/" key="home">
				<HomeIcon />
				<ListItemText primary="Home" />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem component={Link} to="/admin/users" key="users">
				<FaceIcon />
				<ListItemText primary="Users" />
			</ListItem>
			<ListItem component={Link} to="/messages/display" key="messages-root">
				<MessageIcon />
				<ListItemText primary="Messages" />
			</ListItem>
		</List>
	</div>
);

DrawerContent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default DrawerContent;

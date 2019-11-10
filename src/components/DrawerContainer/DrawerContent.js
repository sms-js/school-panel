import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from 'components/icons/HomeIcon';
import MessageIcon from 'components/icons/MessageIcon';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupIcon from 'components/icons/GroupIcon'; //SVG
import FaceIcon from 'components/icons/FaceIcon'; //SVG
import AddStudentIcon from 'components/icons/AddStudentIcon';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { blue } from '@material-ui/core/colors';

const DrawerContent = classes => {
	const [toggle, setToggle] = useState({ groups: false, data: false });

	const useStyles = makeStyles(theme => ({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper
		},
		nested: {
			paddingLeft: theme.spacing(4)
		},
		iconStyle: { color: 'primary' }
	}));
	const nestedListClasses = useStyles();

	function handleToggle(name) {
		const newToggle = { ...toggle };
		newToggle[name] = !newToggle[name];
		setToggle(newToggle);
	}

	return (
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
				<ListItem component={Link} to="/messages/display" key="messages-root">
					<MessageIcon />
					<ListItemText primary="Messages" />
				</ListItem>
				<ListItem key="groups" button onClick={() => handleToggle('groups')}>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary="Groups" />
					{toggle.groups ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={toggle.groups} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							key="generateGroup"
							button
							className={nestedListClasses.nested}
							component={Link}
							to="/groups/generate"
						>
							<ListItemIcon>
								<GroupAddIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary="Generate" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem key="data" button onClick={() => handleToggle('data')}>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary="Data" />
					{toggle.data ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={toggle.data} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem component={Link} to="/admin/users" key="users">
							<FaceIcon />
							<ListItemText primary="Users" />
						</ListItem>
						<ListItem component={Link} to="/data/add" key="addStudentPersonalData">
							<AddStudentIcon color="secondary" />
							<ListItemText primary="Add student" />
						</ListItem>
					</List>
				</Collapse>
			</List>
		</div>
	);
};

DrawerContent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default DrawerContent;

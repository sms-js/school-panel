import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import DrawerToolbar from './DrawerToolbar';
import DrawerBody from './DrawerBody';
import DrawerNav from './DrawerNav';

import styles from './styles';

const DrawerContainer = ({ classes, theme, children, container, title }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<DrawerToolbar classes={classes} title={title} handleDrawerToggle={handleDrawerToggle} />
			<DrawerNav
				classes={classes}
				theme={theme}
				handleDrawerToggle={handleDrawerToggle}
				container={container}
				mobileOpen={mobileOpen}
			/>
			<DrawerBody children={children} classes={classes} />
		</div>
	);
};

DrawerContainer.propTypes = {
	classes: PropTypes.object.isRequired,
	// Injected by the documentation to work in an iframe.
	// You won't need it on your project.
	container: PropTypes.object,
	theme: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles, { withTheme: true })(DrawerContainer);

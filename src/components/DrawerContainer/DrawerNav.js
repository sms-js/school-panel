import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './DrawerContent';

const DrawerNav = ({ classes, theme, handleDrawerToggle, container, mobileOpen }) => {
	return (
		<nav className={classes.drawer}>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<Drawer
					container={container}
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<DrawerContent
						handleDrawerToggle={handleDrawerToggle}
						mobileOpen={mobileOpen}
						theme={theme}
						classes={classes}
					/>
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper
					}}
					variant="permanent"
					open
				>
					<DrawerContent
						handleDrawerToggle={handleDrawerToggle}
						mobileOpen={mobileOpen}
						theme={theme}
						classes={classes}
					/>
				</Drawer>
			</Hidden>
		</nav>
	);
};

DrawerContent.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	handleDrawerToggle: PropTypes.func.isRequired,
	mobileOpen: PropTypes.bool.isRequired,
	container: PropTypes.object
};

export default DrawerNav;

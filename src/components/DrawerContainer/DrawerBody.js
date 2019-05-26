import React from 'react';
import PropTypes from 'prop-types';

const DrawerBody = ({ children, classes }) => {
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			{children}
		</main>
	);
};

DrawerBody.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default DrawerBody;

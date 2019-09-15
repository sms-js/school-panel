import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { StudentPersonalData } from './TabsContent';

import Aux from '../../../../components/AUX/Aux';
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 1 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const TabsContainers = ({ value }) => {
	return (
		<Aux>
			{value === 0 && (
				<TabContainer>
					<StudentPersonalData />
				</TabContainer>
			)}
			{value === 1 && <TabContainer>Health Datax</TabContainer>}
			{value === 2 && <TabContainer>Contact Numbers</TabContainer>}
			{value === 3 && <TabContainer>Authorizations</TabContainer>}
			{value === 4 && <TabContainer>Emergency Data Set</TabContainer>}
			{value === 5 && <TabContainer>Item Six</TabContainer>}
			{value === 6 && <TabContainer>Item Seven</TabContainer>}
		</Aux>
	);
};

export default TabsContainers;

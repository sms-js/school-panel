import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { StudentPersonalData, MotherPersonalData, FatherPersonalData } from './TabsContent';

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
	const getData = params => {
		console.log('getData, params= ', params);
	};
	return (
		<Aux>
			{value === 0 && (
				<TabContainer>
					<StudentPersonalData dispatchData={getData} screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 1 && (
				<TabContainer>
					<MotherPersonalData screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 2 && (
				<TabContainer>
					<FatherPersonalData screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 3 && <TabContainer>Health Datax</TabContainer>}
			{value === 4 && <TabContainer>Contact Numbers</TabContainer>}
			{value === 5 && <TabContainer>Authorizations</TabContainer>}
			{value === 6 && <TabContainer>Emergency Data Set</TabContainer>}
			{value === 7 && <TabContainer>Item Six</TabContainer>}
			{value === 8 && <TabContainer>Item Seven</TabContainer>}
		</Aux>
	);
};

export default TabsContainers;

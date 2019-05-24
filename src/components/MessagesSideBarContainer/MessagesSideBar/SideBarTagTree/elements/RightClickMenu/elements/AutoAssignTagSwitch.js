import React, { useEffect, useState } from 'react';
import Switch from '@material-ui/core/Switch';

const AutoAssignTagSwitch = ({ handleShowTagDatesRange, actualState }) => {
	const [switchState, setSwitchState] = useState(actualState);
	const handleSwitchChange = (event) => {
		setSwitchState(prevState => !prevState);
		handleShowTagDatesRange(event.target.checked);
	};
	return <Switch checked={switchState} onChange={handleSwitchChange} value="checkedB" color="primary" />;
};

export default AutoAssignTagSwitch;

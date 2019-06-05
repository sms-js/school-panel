
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DatePickers from './DatePickers';


const PopOverMenu = ({ anchorEl,getData,handleClose}) => {
	
	return(
		<Menu
		id="simple-menu"
		anchorEl={anchorEl}
		keepMounted
		open={Boolean(anchorEl)}
		onClose={handleClose}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		getContentAnchorEl={null}
	>
		<MenuItem>
				<DatePickers
					sendData={getData}
					name="startDate"
					labelName="Start Date"
				/>
		</MenuItem>
		<MenuItem>
				<DatePickers
					sendData={getData}
					name="endDate"
					labelName="End Date"
				/>
		</MenuItem>
	</Menu>
	)
}

export default PopOverMenu;
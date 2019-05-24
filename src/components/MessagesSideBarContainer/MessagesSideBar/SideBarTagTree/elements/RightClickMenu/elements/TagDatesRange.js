import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const TagDatesRange = ({ sendSelectedDates, handleDatesChange,actualStartDate,actualEndDate }) => {

	const styles = {
		container: {
			display: 'flex',
			flexWrap: 'wrap'
		}
	};

	return (
		<form style={styles.container} noValidate>
			<Grid container direction="row" justify="space-between" alignItems="center">
				<TextField
					id="startDate"
					label="Start auto-assign"
					type="datetime-local"
					//defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
					defaultValue={actualStartDate}
					style={styles.container}
					InputLabelProps={{
						shrink: true
					}}
					onChange={handleDatesChange('startDate')}
				/>
				<TextField
					id="endDate"
					label="End auto-assign"
					type="datetime-local"
					defaultValue={actualEndDate}
					style={styles.container}
					InputLabelProps={{
						shrink: true
					}}
					onChange={handleDatesChange('endDate')}
				/>
			</Grid>
		</form>
	);
};

export default TagDatesRange;

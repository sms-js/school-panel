import React from 'react';
import TextField from '@material-ui/core/TextField';

function DatePickers({ name, labelName, sendData, startingValue }) {
	const styles = {
		container: { display: 'flex', flexWrap: 'wrap' },
		textField: {
			// marginLeft: theme.spacing(1),
			// marginRight: theme.spacing(1),
			width: 200
		}
	};

	return (
		<form style={styles.container} noValidate>
			<TextField
				id={name}
				label={labelName}
				type="date"
				style={styles.textField}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => sendData(event)}
				value={startingValue}
			/>
		</form>
	);
}

export default DatePickers;

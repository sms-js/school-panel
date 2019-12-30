import styles from '../../styles';
import PropTypes from 'prop-types';
import React from 'react';

import { Grid, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { FormItem } from '../elements/';
// import { keyIsObject, isNotEmptyString, isNumber } from 'lib/validators/types';

import { isNotEmptyString } from '../../../../../../lib/validators/types';

const HealthData = ({ data, screenName, dispatchData, classes }) => {
	const handleChange = (value, fieldName, index, userType, error) => {
		console.log({ value, fieldName, index, userType, error });
		dispatchData({ type: fieldName, payLoad: value });
	};

	const formItems = Object.keys(data).map(el => {
		const item = (
			<Grid key={'grid_' + data[el].id} item sm={6}>
				<FormItem
					validateField={isNotEmptyString}
					classes={classes}
					index={0}
					userType="student"
					handleChange={handleChange}
					error={data[el].error}
					key={data[el].id}
					elementId={'id_' + data[el].id}
					type={data[el].type}
					label={data[el].label}
					fieldName={el}
					value={data[el].value}
					selectOptions={data[el].type === 'Select' ? data[el].selectOptions : null}
					header={data[el].type === 'Table' ? data[el].header : null}
				/>
			</Grid>
		);

		return item;
	});

	return (
		<Grid container spacing={2} style={{ flexGrow: 1 }}>
			<Paper className={classes.root} elevation={1} style={{ flexGrow: 1 }}>
				<Grid container direction="row" style={{ flexGrow: 1 }}>
					{formItems}
				</Grid>
			</Paper>
		</Grid>
	);
};

HealthData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HealthData);

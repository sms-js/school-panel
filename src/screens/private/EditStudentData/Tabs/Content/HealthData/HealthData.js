import styles from '../../styles';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DrawerContainer from 'components/DrawerContainer';
import { studentLib } from 'lib/models';

import { Redirect } from 'react-router-dom';
import { keyIsObject, isNotEmptyString, isNumber } from 'lib/validators/types';
import { updateClassDeclaration } from 'typescript';
import FItem from './FItem';

const HealthData = ({ classes, dataSet, dispatchData }) => {
	//sets initial values
	const [data, setData] = useState(dataSet);

	const MiniFormik = props => {
		const [state, setState] = useState({
			values: props.initialValues || {}
		});

		const handleChange = event => {
			//dispatchData({ type: event.target.name, payLoad: event.target.value });
			const target = event.target;
			event.persist();
			const name = target.name;
			const value = target.value;
			const newState = JSON.parse(JSON.stringify(data));
			newState[event.target.name] = event.target.value;
			setData(newState);
			setState({ [name]: value });
		};

		return props.children({ handleChange });
	};

	const items = ({ handleChange }) => {
		const result = Object.keys(data).map(key => {
			const item = (
				<FItem
					name={key}
					id={'id_' + key}
					key={'key_' + key}
					label={key}
					value={data[key]}
					handleChange={handleChange}
					classes={classes}
				></FItem>
			);
			return item;
		});
		return result;
	};

	return (
		<Grid container spacing={2} style={{ flexGrow: 1 }} item sm={9}>
			<Paper className={classes.root} elevation={1} style={{ flexGrow: 1 }}>
				<MiniFormik>{() => items()}</MiniFormik>
			</Paper>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</Grid>
	);
};

HealthData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HealthData);

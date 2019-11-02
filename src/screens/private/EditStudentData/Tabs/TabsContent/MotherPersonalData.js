import styles from '../../../users/UserEdition/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DrawerContainer from 'components/DrawerContainer';
import { studentLib } from 'lib/models';

import {
	FormItem,
	Email,
	FirstName,
	LastName,
	UserType,
	UserName,
	IdNumber,
	BirthDate
} from '../../../users/UserEdition/inputs';
import { Redirect } from 'react-router-dom';
import { keyIsObject, isNotEmptyString, isNumber } from 'lib/validators/types';

const MotherPersonalData = ({ adressEditable,motherData,classes, match, screenName }) => {
	const [mother, setMother] = useState(motherData);

	const [errors, setErrors] = useState({
		firstName: false,
		lastName: false,
		email: false,
		idNumber: false,
		streetName: false,
		houseNr: false,
		floorNr: false,
		flatNr: false,
		zipCode: false,
		birthDate: false,
		clean: true,
		username: false,
		livesWith: false,
		cellPhone: false,
	});
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);

	const handleChange = (value, fieldName, index, userType, error) => {
		const newState = mother;
		newState[fieldName].value = value;
		setMother(Object.assign(mother, newState));
		setLoading(false);
		setSuccess(false);
		setError(false);
		setErrors({ ...errors, [fieldName]: error, clean: false });
	};

	const formItems = Object.keys(mother).map(key => {
		return (
			<Grid key={'grid_' + mother[key].id} item sm={3}>
				<FormItem
					key={mother[key].id}
					elementId={'id_' + mother[key].id}
					type={mother[key].type}
					validateField={isNotEmptyString}
					label={mother[key].label}
					fieldName={key}
					classes={classes}
					handleChange={handleChange}
					index={0}
					userType="student"
					value={mother[key].value}
					error={errors[key]}
					editable={adressEditable}
				/>
			</Grid>
		);
	});

	const handleSubmit = async e => {
		console.log('handleSubmit / mother = ', mother);
		console.log('handleSubmit / mother = ', errors);
		e.preventDefault();
		if (errors.clean) {
			setError(true);
			return;
		}
		setLoading(true);
		setSuccess(false);
		setError(false);
		if (Object.values(errors).indexOf(true) >= 0) {
			setLoading(false);
			return;
		}
		const response = mother._id
			? await studentLib.updateUser(mother._id, mother)//@todo: check this
			: await studentLib.createParent(mother);
		setLoading(false);
		if (!response) return setError(true);
		setSuccess(true);
	};

	useEffect(() => {
		const loadUser = async () => {
			const params = keyIsObject(match, 'params') ? match.params : {};
			if (params.id) {
				const data = await studentLib.getUser(params.id);
				if (!data) {
					setError(true);
				} else {
					setMother(data);
				}
				setLoading(false);
			} else {
				setLoading(false);
			}
		};
		loadUser();
	}, [match]);

	if (mustReturn) return <Redirect to="/admin/users" />;

	return (
		<Grid container spacing={2} style={{ flexGrow: 1 }}>
			<Paper className={classes.root} elevation={1} style={{ flexGrow: 1 }}>
				{loading && <LinearProgress />}
				<form
					onSubmit={handleSubmit}
					className={[classes.container, classes.form].join(' ')}
					noValidate
					autoComplete="off"
				>
					{/* STUDENT NAME, BIRTHDATE AND ID DATA */}
					<Grid container direction="row" style={{ flexGrow: 1 }}>
						{formItems}
					</Grid>
					{success && <span className={classes.success}>Profile update success</span>}
					{error && <span className={classes.error}>Profile update error</span>}
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						Save
					</Button>
				</form>
			</Paper>
		</Grid>
	);
};

MotherPersonalData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MotherPersonalData);
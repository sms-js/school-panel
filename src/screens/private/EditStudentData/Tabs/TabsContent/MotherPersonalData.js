import styles from '../../../users/UserEdition/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DrawerContainer from 'components/DrawerContainer';
import { studentLib } from 'lib/models';

import { FormItem } from '../../../users/UserEdition/inputs';
import { Redirect } from 'react-router-dom';
import { keyIsObject, isNotEmptyString, isNumber } from 'lib/validators/types';
import { updateClassDeclaration } from 'typescript';

const MotherPersonalData = ({ adressEditable, motherData, classes, match, screenName, dispatchData }) => {
	const [mother, setMother] = useState(motherData);

	const [errors, setErrors] = useState(
		Object.keys(motherData).reduce((acc, key) => {
			acc[key] = false;
			return acc;
		}, {})
	);

	const [formError, setFormError] = useState(true);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);

	const updateFormErrors = () => {
		const hasErrors =
			Object.values(errors).indexOf(true) === -1
				? false //this happens, when all fields are fullfiled
				: true;
		setFormError(hasErrors);
	};

	const handleChange = (value, fieldName, index, userType, error) => {
		const newState = mother;
		newState[fieldName].value = value;
		setMother(Object.assign(mother, newState));
		setLoading(false);
		setSuccess(false);
		setErrors({ ...errors, [fieldName]: error });
		updateFormErrors();
		setTabsContainerState();
	};

	const setTabsContainerState = () => {
		dispatchData({ type: 'setMotherData', payLoad: mother });
	};

	const formItems = Object.keys(mother).map(key => {
		return (
			<Grid key={'grid_' + mother[key].id} item sm={3}>
				<FormItem
					validateField={isNotEmptyString}
					classes={classes}
					index={0}
					userType="mother"
					handleChange={handleChange}
					error={errors[key]}
					key={mother[key].id}
					elementId={'id_' + mother[key].id}
					type={mother[key].type}
					label={mother[key].label}
					fieldName={key}
					value={mother[key].value}
					selectOptions={mother[key].type === 'Select' ? mother[key].selectOptions : null}
					editable={adressEditable}
				/>
			</Grid>
		);
	});
	useEffect(() => {
		console.log('UE ERROR');
	}, [error]);

	const handleSubmit = async e => {
		const abortController = new AbortController();
		e.preventDefault();
		if (formError) return setError(true);
		setLoading(true);
		setSuccess(false);
		setError(false);
		if (Object.values(errors).indexOf(true) >= 0) return setLoading(false);
		const response = mother._id
			? await studentLib.updateUser(mother._id, mother) //@todo:createParent
			: await studentLib.createParent(abortController.mother);
		setLoading(false);
		if (!response) {
			//following line cancels the async submission
			abortController.abort();
			setError(true);
			return;
		}
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
					{/* MOTHER NAME, BIRTHDATE AND ID DATA */}
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

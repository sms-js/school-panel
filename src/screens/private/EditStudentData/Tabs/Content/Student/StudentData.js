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

import { FormItem } from '../elements/';
import { Redirect } from 'react-router-dom';
import { keyIsObject, isNotEmptyString, isNumber } from 'lib/validators/types';
import { updateClassDeclaration } from 'typescript';
import create from 'antd/lib/icon/IconFont';

const StudentData = ({
	profileError,
	studentData,
	classes,
	match,
	screenName,
	dispatchData,
	studentId,
	successMsg
}) => {
	const [student, setStudent] = useState(studentData);
	const [formError, setFormError] = useState(true);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);
	const [buttonText, setButtonText] = useState('Savex');
	const [errors, setErrors] = useState(
		Object.keys(studentData).reduce((acc, key) => {
			acc[key] = false;
			return acc;
		}, {})
	);

	//when studentId is defined: changed data will be patched.
	useEffect(() => {
		const text = studentId !== undefined ? 'Update' : 'Save';
		setButtonText(text);
	}, [studentId]);

	useEffect(() => {
		console.log('StudentPersonalData - UE - ERROR');
	}, [error]);

	const updateFormErrors = () => {
		const hasErrors =
			Object.values(errors).indexOf(true) === -1
				? false //this happens, when all fields are fullfiled
				: true;
		setFormError(hasErrors);
	};

	const handleChange = (value, fieldName, index, userType, error) => {
		const newState = student;
		newState[fieldName].value = value;
		setStudent(Object.assign(student, newState));
		setLoading(false);
		setSuccess(false);
		setErrors({ ...errors, [fieldName]: error });
		updateFormErrors();
		setTabsContainerState();
	};

	const setTabsContainerState = () => {
		dispatchData({ type: 'setStudentData', payLoad: student });
	};

	const formItems = Object.keys(student).map(key => {
		return (
			<Grid key={'grid_' + student[key].id} item sm={3}>
				<FormItem
					validateField={isNotEmptyString}
					classes={classes}
					index={0}
					userType="student"
					handleChange={handleChange}
					error={errors[key]}
					key={student[key].id}
					elementId={'id_' + student[key].id}
					type={student[key].type}
					label={student[key].label}
					fieldName={key}
					value={student[key].value}
					selectOptions={student[key].type === 'Select' ? student[key].selectOptions : null}
				/>
			</Grid>
		);
	});

	const handleSubmit = async e => {
		e.preventDefault();
		if (formError) return setError(true);
		setSuccess(false);
		setError(false);
		setLoading(true);
		if (Object.values(errors).indexOf(true) >= 0) return setLoading(false);
		dispatchData({ type: 'postStudentData', payLoad: true });
		setLoading(false);
	};

	useEffect(() => {
		const loadUser = async () => {
			const params = keyIsObject(match, 'params') ? match.params : {};
			if (params.id) {
				const data = await studentLib.getUser(params.id);
				if (!data) {
					setError(true);
				} else {
					setStudent(data);
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
		<Grid container spacing={1} className={classes.root}>
			<Paper elevation={1}>
				{loading && <LinearProgress />}
				<form
					onSubmit={handleSubmit}
					className={[classes.container, classes.form].join(' ')}
					noValidate
					autoComplete="off"
				>
					{/* STUDENT NAME, BIRTHDATE AND ID DATA */}
					<Grid container direction="row" >
						{formItems}
					</Grid>
					{successMsg && <span className={classes.success}>{successMsg}</span>}
					{profileError && <span className={classes.error}>{profileError}</span>}
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						{buttonText}
					</Button>
				</form>
			</Paper>
		</Grid>
	);
};

StudentData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentData);

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
import { updateClassDeclaration } from 'typescript';

const StudentPersonalData = ({ studentData, classes, match, screenName, dispatchData }) => {
	const [student, setStudent] = useState(studentData);

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
		username: false,
		livesWith: false,
		assignedGrade: false
	});
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

	// useEffect(() => {
	// 	debugger
	// 	updateFormErrors();
	// }, [errors]);

	const handleChange = (value, fieldName, index, userType, error) => {
		const newState = student;
		newState[fieldName].value = value;
		setStudent(Object.assign(student, newState));
		setLoading(false);
		setSuccess(false);
		//setError(false);
		setErrors({ ...errors, [fieldName]: error });
		updateFormErrors();
		//
		//setErrors(() => Object.assign(errors, { [fieldName]: error }));
		setTabsContainerState();
	};

	const setTabsContainerState = () => {
		const data = Object.keys(student).reduce((acc, currentKey) => {
			const keyValue = student[currentKey].value;
			acc[currentKey] = keyValue !== undefined ? keyValue : '';
			return acc;
		}, {});
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
	useEffect(() => {
		console.log('UE ERROR');
	}, [error]);

	const handleSubmit = async e => {
		console.log('handleSubmit / student = ', student);
		console.log('handleSubmit / student = ', errors);
		const abortController = new AbortController();
		e.preventDefault();
		
		if (formError) {
			
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
		const response = student._id
			? await studentLib.updateUser(student._id, student) //@todo:updateStudent
			: await studentLib.createStudent(abortController.student);
		
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

StudentPersonalData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentPersonalData);

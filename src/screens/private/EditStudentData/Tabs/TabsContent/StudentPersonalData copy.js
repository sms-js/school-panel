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
	TextInput,
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

const StudentPersonalData = ({ classes, match, screenName }) => {
	//screenName='studenPersonalData'

	const [student, setStudent] = useState({
		email: 'alexis.schapiro@gmail.com',
		firstName: 'testFirstNameX',
		lastName: 'testLastNameX',
		username: 'userTestNameX',
		idNumber: '11222333',
		streetName: 'Av. Siempre Viva',
		houseNr: '456',
		floorNr: '1',
		flatNr: 'A',
		zipCode: '1427',
		cellPhoneNumber: '6939 3322',
		type: 'student',
		birthDate: '',
		livesWith: ['father', 'mother']
	});
	const [user, setUser] = useState({
		student: {
			email: 'alexis.schapiro@gmail.com',
			firstName: 'testFirstNameX',
			lastName: 'testLastNameX',
			username: 'userTestNameX',
			idNumber: '11222333',
			streetName: 'Av. Siempre Viva',
			houseNr: '456',
			floorNr: '1',
			flatNr: 'A',
			zipCode: '1427',
			cellPhoneNumber: '6939 3322',
			type: 'student',
			birthDate: '',
			livesWith: ['father', 'mother']
		},
		father: {
			email: 'father@gmail.com',
			firstName: 'fatherFirstName',
			lastName: 'fatherLastName',
			username: 'usernameFather',
			idNumber: '223344',
			streetName: 'Av. de los divorciados',
			houseNr: '111',
			floorNr: 'pb',
			flatNr: 'h',
			zipCode: '1427',
			cellPhoneNumber: '6939 3322',
			type: 'studentParent',
			birthDate: ''
		},
		mother: {
			email: 'mother@gmail.com',
			firstName: 'motherFN',
			lastName: 'motherLN',
			username: 'userNameMother',
			idNumber: '4433222',
			streetName: 'Av. de las Brujas',
			houseNr: '555',
			floorNr: '10',
			flatNr: 'A',
			zipCode: '1427',
			cellPhoneNumber: '4433 2222',
			type: 'studentParent',
			birthDate: ''
		}
	});

	const [errors, setErrors] = useState({
		clean: true,
		email: false,
		firstName: false,
		lastName: false,
		username: false,
		type: false,
		idNumber: false,
		birthDate: false,
		street: false,
		houseNr: false,
		flatNr: false,
		floorNr: false
	});
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);
	const [displayItem] = useState(false);


	const handleChange = (name, type) => {
		console.log('handleChange - name / type', name, type);
		return (value, fieldName, index, userType, error) => {
			debugger;
			const newUserState = JSON.parse(JSON.stringify(user));
			newUserState[type][name] = value;
			console.log('newUserState = ', newUserState);
			setLoading(false);
			setSuccess(false);
			setError(false);
			setErrors({ ...errors, [name]: error, clean: false });
			//setStudent({ ...student, [name]: value });
			setUser(newUserState);
		};
	};

	const handleSubmit = async e => {
		console.log('handleSubmit / user = ', user);
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
		const response = student._id
			? await studentLib.updateStudent(student._id, student)
			: await studentLib.createStudent(student);
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

	const MainPersonalData = ({ handleChange }) => {
		const formItems2 = Object.keys(user).map(userType => {
			return Object.keys(user[userType]).map((formItem, index) => {
				return (
					<Grid key={'keyG_' + userType + '_' + formItem} item sm={3}>
						<TextInput
							key={'key_' + userType + '_' + formItem}
							type="text"
							validateField={isNotEmptyString}
							elementId={formItem}
							label={'key_' + userType + '_' + formItem}
							fieldName={formItem}
							classes={classes}
							//handleChange={handleChange(formItem, userType)}
							handleChange={handleChange(formItem, userType)}
							index={index}
							userType={userType}
							value={user[userType][formItem]}
							error={errors[formItem]}
						/>
					</Grid>
				);
			});
		});

		const formItems = formItems2.reduce((acc, cur) => {
			return acc.concat(cur);
		}, []);
		console.log(formItems);
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
							{formItems2}
						</Grid>
						<UserType
							disabled={true}
							classes={classes}
							handleChange={handleChange('type')}
							value={student.type}
							error={errors.type}
						/>
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

	const RunningComponent = () => (
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
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'firstName'}
								label={"Student's first name"}
								fieldName={'firstName'}
								classes={classes}
								handleChange={handleChange('firstName', 'student')}
								value={user.student.firstName}
								error={errors.firstName}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'lastName'}
								label={"Student's last name"}
								fieldName={'lastName'}
								classes={classes}
								handleChange={handleChange('lastName', 'student')}
								value={student.lastName}
								error={errors.lastName}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="number"
								validateField={isNotEmptyString}
								elementId={'idNumber'}
								label={"Student's id number"}
								fieldName={'idNumber'}
								classes={classes}
								handleChange={handleChange('idNumber', 'student')}
								value={student.idNumber}
								error={errors.idNumber}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="date"
								//defaultValue="01-01-2010"
								validateField={isNotEmptyString}
								elementId={'birthDate'}
								label={"Student's birthdate"}
								fieldName={'birthDate'}
								classes={classes}
								handleChange={handleChange('birthDate', 'student')}
								value={user.student.birthDate}
								error={errors.birthDate}
								shrinkInputLabel={true}
							/>
						</Grid>
						{/** STUDENT ADRESS */}
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'streetName'}
								label={'Street'}
								fieldName={'streetName'}
								classes={classes}
								handleChange={handleChange('streetName', 'student')}
								value={student.streetName}
								error={errors.street}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'houseNr'}
								label={'Haus Nr.'}
								fieldName={'houseNr'}
								classes={classes}
								handleChange={handleChange('houseNr', 'student')}
								value={student.houseNr}
								error={errors.houseNr}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'floorNr'}
								label={"Student's Floor"}
								fieldName={'floorNr'}
								classes={classes}
								handleChange={handleChange('floorNr', 'student')}
								value={student.floorNr}
								error={errors.floorNr}
							/>
						</Grid>
						<Grid item sm={3}>
							<TextInput
								type="text"
								validateField={isNotEmptyString}
								elementId={'flatNr'}
								label={'Appartment Nr.'}
								fieldName={'flatNr'}
								classes={classes}
								handleChange={handleChange('flatNr', 'student')}
								value={student.flatNr}
								error={errors.flatNr}
							/>
						</Grid>
					</Grid>

					{displayItem ? (
						<UserName
							classes={classes}
							handleChange={handleChange('username')}
							value={student.username}
							error={errors.username}
						/>
					) : null}
					{displayItem ? (
						<Email classes={classes} handleChange={handleChange('email')} value={student.email} error={errors.email} />
					) : null}
					<UserType
						disabled={true}
						classes={classes}
						handleChange={handleChange('type')}
						value={student.type}
						error={errors.type}
					/>
					{success && <span className={classes.success}>Profile update success</span>}
					{error && <span className={classes.error}>Profile update error</span>}
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						Save
					</Button>
				</form>
			</Paper>
		</Grid>
	);
	return <MainPersonalData handleChange={handleChange} />;
};

StudentPersonalData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentPersonalData);

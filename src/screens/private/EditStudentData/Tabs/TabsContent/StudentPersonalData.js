import styles from '../../../users/UserEdition/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DrawerContainer from 'components/DrawerContainer';
import { user as userLib } from 'lib/models';
import { Email, FirstName, LastName, UserType, UserName, IdNumber,BirthDate } from '../../../users/UserEdition/inputs';
import { Redirect } from 'react-router-dom';
import { keyIsObject } from 'lib/validators/types';

const StudentPersonalData = ({ classes, match }) => {
	const [user, setUser] = useState({
		email: 'alexis.schapiro@gmail.com',
		firstName: 'testFirstNameX',
		lastName: 'testLastNameX',
		username: 'userTestNameX',
		idNumber: '11222333',
		streetName: 'Av. Siempre Viva',
		streetNumber: '456',
		houseDoor: 'A',
		zipCode: '1427',
		cellPhoneNumber: '6939 3322',
		type: 'student',
		//birthdate:''
	});
	const [errors, setErrors] = useState({
		clean: true,
		email: false,
		firstName: false,
		lastName: false,
		username: false,
		type: false,
		idNumber: false,
		birthdate:false
	});
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);
	const [displayItem] = useState(false);

	const handleChange = name => {
		return (value, error) => {
			setLoading(false);
			setSuccess(false);
			setError(false);
			setErrors({ ...errors, [name]: error, clean: false });
			setUser({ ...user, [name]: value });
		};
	};

	const handleSubmit = async e => {
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
		const response = user._id ? await userLib.updateUser(user._id, user) : await userLib.createUser(user);
		setLoading(false);
		if (!response) return setError(true);
		setSuccess(true);
	};

	useEffect(() => {
		const loadUser = async () => {
			const params = keyIsObject(match, 'params') ? match.params : {};
			if (params.id) {
				const data = await userLib.getUser(params.id);
				if (!data) {
					setError(true);
				} else {
					setUser(data);
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
					<Grid container direction="row" style={{ flexGrow: 1 }}>
						<Grid item sm={3}>
							<FirstName
								elementId={'studentFirstName'}
								label={"Student's first name"}
								fielName={'studentFirstName'}
								classes={classes}
								handleChange={handleChange('firstName')}
								value={user.firstName}
								error={errors.firstName}
							/>
						</Grid>
						<Grid item sm={3}>
							<LastName
								elementId={'studentLastName'}
								label={"Student's last name"}
								fielName={'studentLastName'}
								classes={classes}
								handleChange={handleChange('lastName')}
								value={user.lastName}
								error={errors.lastName}
							/>
						</Grid>
						<Grid item sm={3}>
							<IdNumber
								elementId={'studentIdNumber'}
								label={"Student's id number"}
								fielName={'studentIdNumber'}
								classes={classes}
								handleChange={handleChange('idNumber')}
								value={user.idNumber}
								error={errors.idNumber}
							/>
						</Grid>
						<Grid item sm={3}>
							<BirthDate
								elementId={'studentBirthDate'}
								label={"Student's birthdate"}
								fielName={'studentBirthDate'}
								classes={classes}
								handleChange={handleChange('birthdate')}
								//value={user.birthdate}
								error={errors.birthdate}
							/>
						</Grid>
					</Grid>

					{displayItem ? (
						<UserName
							classes={classes}
							handleChange={handleChange('username')}
							value={user.username}
							error={errors.username}
						/>
					) : null}
					{displayItem ? (
						<Email classes={classes} handleChange={handleChange('email')} value={user.email} error={errors.email} />
					) : null}
					<UserType
						disabled={true}
						classes={classes}
						handleChange={handleChange('type')}
						value={user.type}
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

StudentPersonalData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentPersonalData);

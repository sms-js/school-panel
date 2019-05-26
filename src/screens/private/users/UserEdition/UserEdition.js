import styles from './styles.js';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import DrawerContainer from 'components/DrawerContainer';
import { user as userLib } from 'lib/models';
import { Email, FirstName, LastName, UserType, UserName } from './inputs';
import { Redirect } from 'react-router-dom';
import { keyIsObject } from 'lib/validators/types';

const UserEdition = ({ classes, match }) => {
	const params = keyIsObject(match, 'params') ? match.params : {};
	const [user, setUser] = useState({
		email: '',
		firstName: '',
		lastName: '',
		username: '',
		type: ''
	});
	const [errors, setErrors] = useState({
		clean: true,
		email: false,
		firstName: false,
		lastName: false,
		username: false,
		type: false
	});
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);

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

	const loadUser = async () => {
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

	useEffect(() => {
		loadUser();
	}, []);

	if (mustReturn) return <Redirect to="/admin/users" />;

	return (
		<DrawerContainer title={user._id ? 'Update user' : 'Create user'}>
			<Paper className={classes.root} elevation={1}>
				{loading && <LinearProgress />}
				<form
					onSubmit={handleSubmit}
					className={[classes.container, classes.form].join(' ')}
					noValidate
					autoComplete="off"
				>
					<FirstName
						classes={classes}
						handleChange={handleChange('firstName')}
						value={user.firstName}
						error={errors.firstName}
					/>
					<LastName
						classes={classes}
						handleChange={handleChange('lastName')}
						value={user.lastName}
						error={errors.lastName}
					/>
					<UserName
						classes={classes}
						handleChange={handleChange('username')}
						value={user.username}
						error={errors.username}
					/>
					<Email classes={classes} handleChange={handleChange('email')} value={user.email} error={errors.email} />
					<UserType classes={classes} handleChange={handleChange('type')} value={user.type} error={errors.type} />
					{success && <span className={classes.success}>Profile update success</span>}
					{error && <span className={classes.error}>Profile update error</span>}
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						Save
					</Button>
				</form>
			</Paper>
		</DrawerContainer>
	);
};

UserEdition.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserEdition);

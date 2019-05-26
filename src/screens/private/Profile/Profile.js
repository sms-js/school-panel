import styles from './styles.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import React, { useState, useContext } from 'react';
import DrawerContainer from 'components/DrawerContainer';
import { updateProfile } from 'lib/api';
import SessionContext from 'components/SessionContext';
import { UserName, FirstName, LastName, Password, PasswordConfirm } from './inputs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Profile = ({ classes }) => {
	const session = useContext(SessionContext.context);

	const [profile, setProfile] = useState(session.user);

	const [showingPassword, setShowingPassword] = useState(false);
	const [success, setRequestSuccess] = useState(false);
	const [error, setRequestError] = useState(false);

	const handleChange = name => {
		return event => {
			return setProfile({ ...profile, [name]: event.target.value });
		};
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setRequestSuccess(false);
		setRequestError(false);
		if (
			!profile.username ||
			!profile.firstName ||
			!profile.lastName ||
			(profile.password && profile.password.length < 4) ||
			profile.password !== profile.passwordConfirm
		) {
			return;
		}
		const response = await updateProfile(session.user._id, profile);
		if (!response) {
			setRequestError(true);
			return;
		}
		setRequestSuccess(true);
		session.updateUser(response);
	};

	return (
		<DrawerContainer title="Profile">
			<Paper className={classes.root} elevation={1}>
				<form
					onSubmit={handleSubmit}
					className={[classes.container, classes.form].join(' ')}
					noValidate
					autoComplete="off"
				>
					<UserName classes={classes} handleChange={handleChange} value={profile.username} />
					<FirstName classes={classes} handleChange={handleChange} value={profile.firstName} />
					<LastName classes={classes} handleChange={handleChange} value={profile.lastName} />
					{showingPassword && (
						<Password
							classes={classes}
							handleChange={handleChange}
							value={profile.password}
							confirm={profile.passwordConfirm}
						/>
					)}
					{showingPassword && (
						<PasswordConfirm
							classes={classes}
							handleChange={handleChange}
							value={profile.passwordConfirm}
							password={profile.password}
						/>
					)}
					{success && <span className={classes.success}>Profile update success</span>}
					{error && <span className={classes.error}>Profile update error</span>}
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						Save
					</Button>
					<Button variant="contained" className={classes.button} onClick={() => setShowingPassword(!showingPassword)}>
						{!showingPassword ? 'Update password' : 'Hide'}
					</Button>
				</form>
			</Paper>
		</DrawerContainer>
	);
};

Profile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);

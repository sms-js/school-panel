import styles from './styles';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DrawerContainer from 'components/DrawerContainer';
import { user as userLib } from 'lib/models';
import UsersTable from './UsersTable';
import Confirm from 'components/Confirm';

const UsersList = ({ classes }) => {
	const [deleteUser, setDeleteUser] = useState(false);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		loadList();
	}, []);

	const loadList = async () => {
		const data = await userLib.getUsers();
		setLoading(false);
		if (!data) return setError(true);
		setUsers(data.map(user => ({ ...user, key: `list_${user._id}` })));
	};

	const onDelete = async id => {
		const user = users.find(user => user._id === id);
		setDeleteUser(user);
	};

	const handleClose = async mustDelete => {
		const id = deleteUser._id;
		setDeleteUser(false);
		if (mustDelete) {
			setLoading(true);
			const success = await userLib.deleteUser(id);
			if (success) setUsers(users.filter(user => user._id !== id));
			else setError(true);
			setLoading(false);
		}
	};

	return (
		<DrawerContainer title="Users">
			<Button type="submit" color="primary" variant="contained" className={classes.button}>
				<Link className={classes.buttonLink} to="/admin/user">
					Create
				</Link>
			</Button>
			{loading && <LinearProgress />}
			{error && <FormHelperText className={classes.error}>User is not authorized to make that action</FormHelperText>}
			<Paper className={classes.root}>
				<UsersTable users={users} onDelete={onDelete} />
			</Paper>
			<Confirm
				show={deleteUser}
				handleClose={handleClose}
				title="Delete user"
				description={`Are you sure you want to delete (${deleteUser ? deleteUser.email : ''})`}
			/>
		</DrawerContainer>
	);
};

export default withStyles(styles, { withTheme: true })(UsersList);

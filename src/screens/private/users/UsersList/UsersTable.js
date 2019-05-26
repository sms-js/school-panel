import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styles from './styles';

const UsersTable = ({ classes, users, onDelete }) => {
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>Username</TableCell>
					<TableCell align="left">Last name</TableCell>
					<TableCell align="left">Last name</TableCell>
					<TableCell align="left">Email</TableCell>
					<TableCell align="left">Action</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{users.map(user => (
					<TableRow key={user._id}>
						<TableCell component="th" scope="row">
							{user.username}
						</TableCell>
						<TableCell align="left">{user.firstName}</TableCell>
						<TableCell align="left">{user.lastName}</TableCell>
						<TableCell align="left">{user.email}</TableCell>
						<TableCell align="left">
							<Button color="primary" variant="contained" className={classes.tableButton}>
								<Link to={`/admin/user/${user._id}`} className={classes.buttonLink}>
									Edit
								</Link>
							</Button>
							<Button
								disabled={user.username === 'admin'}
								color="secondary"
								variant="contained"
								className={classes.tableButton}
								onClick={() => onDelete(user._id)}
							>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default withStyles(styles, { withTheme: true })(UsersTable);

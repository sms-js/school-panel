import styles from './UsersList.module.css';

import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import SideBarContainer from 'components/SideBarContainer';
import { user as userLib } from 'lib/models';
import UsersTable from './UsersTable';

import { Link } from 'react-router-dom';

const confirm = Modal.confirm;

const UsersList = () => {
	const [ users, setUsers ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		loadList();
	}, []);

	const loadList = async () => {
		const data = await userLib.getUsers();
		setLoading(false);
		if (!data) return setError(true);
		setUsers(data.map((user) => ({ ...user, key: `list_${user._id}` })));
	};

	const onDelete = async (id) => {
		const user = users.find((user) => user._id === id);
		confirm({
			title: 'Do you want to delete these item?',
			content: `${user.firstName} ${user.lastName} will be deleted, are you sure?`,
			async onOk() {
				setLoading(true);
				const success = await userLib.deleteUser(id);
				if (success) setUsers(users.filter((user) => user._id !== id));
				else setError(true);
				setLoading(false);
			},
			onCancel() {}
		});
	};

	return (
		<SideBarContainer title="Users">
			<div className={styles['user-list-container']}>
				{error && <Form.Item validateStatus="error" help="User is not authorized to make that action" />}
				<Button type="secondary" htmlType="button" className={styles['login-form-button']}>
					<Link to="/admin/user">{loading && <Spin />} Create</Link>
				</Button>
				<UsersTable users={users} onDelete={onDelete} />
			</div>
		</SideBarContainer>
	);
};

export default UsersList;

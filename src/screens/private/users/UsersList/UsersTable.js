import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
	{
		title: 'First name',
		dataIndex: 'firstName',
		key: 'firstName',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Last name',
		dataIndex: 'lastName',
		key: 'lastName',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, user) => (
			<span>
				<Link to={`/admin/user/${user._id}`}>Edit</Link>
				<a href="#" style={{ marginLeft: '5px', color: 'red' }} onClick={user.onDelete}>
					Delete
				</a>
			</span>
		)
	}
];

const UsersTable = ({ users, onDelete }) => (
	<Table
		columns={columns}
		dataSource={users.map((user) => {
			user.onDelete = () => onDelete(user._id);
			return user;
		})}
	/>
);

export default UsersTable;

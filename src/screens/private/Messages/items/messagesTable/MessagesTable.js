import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import styles from './MessagesTable.module.css';

const columns = [
	{
		title: 'Fecha',
		dataIndex: 'deliveryDate',
		key: 'deliveryDate',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Carpeta',
		dataIndex: 'messageData.tags',
		key: 'tagsLIst',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Mensaje',
		dataIndex: 'messageData.body',
		key: 'messageText',
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

const MessagesTable = ({ messages, onDelete }) => (
	<Table
		columns={columns}
		dataSource={messages.map((message) => {
			message.onDelete = () => onDelete(message._id);
			return message;
		})}
	/>
);

export default MessagesTable;

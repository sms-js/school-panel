import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin, Table } from 'antd';
import { Link } from 'react-router-dom';
import styles from './MessagesTable.module.css';
import SideBarContainer from 'components/SideBarContainer';
import SessionContext from 'components/SessionContext';

console.log(SessionContext);

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
				<a href="#" style={{ marginLeft: '5px', color: 'red' }} onClick={user.onDelete}>
					Delete
				</a>
			</span>
		)
	}
];

const MessagesTable = ({ messages, onDelete }) => {

const [ error, setError ] = useState(false);
const [ loading, setLoading ] = useState(false);

	const tablecomponent = (
		<Table
			columns={columns}
			dataSource={messages.map((message) => {
				message.onDelete = () => onDelete(message._id);
				return message;
			})}
		/>
	);

	const SideBarComponent = (
			<div className={styles['user-list-container']}>
				{tablecomponent}
			</div>
	);

	return SideBarComponent;
};

export default MessagesTable;

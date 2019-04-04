import React from 'react';
import styles from '../Profile.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, session) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('username', {
		rules: [{ required: true, message: 'Please input your username!' }],
		initialValue: session.user.username
	})(
		<Input
			key="profile-username-input"
			disabled
			prefix={<Icon type="tag" className={styles['profile-icon']} />}
			placeholder="Username"
		/>
	);
};

const UserName = ({ form, session }) => <Form.Item label="Username">{getInput(form, session)}</Form.Item>;

export default UserName;

import React from 'react';
import styles from '../Profile.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, session) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('lastName', {
		rules: [ { required: true, message: 'Please input your last name!' } ],
		initialValue: session.user.lastName
	})(
		<Input
			key="profile-lastname-input"
			prefix={<Icon type="tag" className={styles['profile-icon']} />}
			placeholder="Last name"
		/>
	);
};

const LastName = ({ form, session }) => <Form.Item label="Last name">{getInput(form, session)}</Form.Item>;

export default LastName;

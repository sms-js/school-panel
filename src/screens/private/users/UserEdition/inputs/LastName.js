import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, user) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('lastName', {
		rules: [{ required: true, message: 'Please input your last name!' }],
		initialValue: user.lastName
	})(
		<Input
			key="profile-lastname-input"
			prefix={<Icon type="tag" className={styles['home-icon']} />}
			placeholder="Last name"
		/>
	);
};

const LastName = ({ form, user }) => <Form.Item hasFeedback label="Last name">{getInput(form, user)}</Form.Item>;

export default LastName;

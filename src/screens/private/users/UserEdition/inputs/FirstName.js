import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, user) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('first_name', {
		rules: [{ required: true, message: 'Please input your first name!' }],
		initialValue: user.first_name
	})(
		<Input
			key="profile-firstname-input"
			prefix={<Icon type="tag" className={styles['home-icon']} />}
			placeholder="First name"
		/>
	);
};

const FirstName = ({ form, user }) => <Form.Item label="First name">{getInput(form, user)}</Form.Item>;

export default FirstName;

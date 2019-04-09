import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, user) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('firstName', {
		rules: [{ required: true, message: 'Please input your first name!' }],
		initialValue: user.firstName
	})(
		<Input
			key="profile-firstname-input"
			prefix={<Icon type="tag" className={styles['home-icon']} />}
			placeholder="First name"
		/>
	);
};

const FirstName = ({ form, user }) => <Form.Item hasFeedback label="First name">{getInput(form, user)}</Form.Item>;

export default FirstName;

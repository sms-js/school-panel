import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, user) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('username', {
		rules: [ { required: true, message: 'Please enter a username' } ],
		initialValue: user.username
	})(
		<Input
			key="profile-username-input"
			prefix={<Icon type="tag" className={styles['home-icon']} />}
			placeholder="Username"
		/>
	);
};

const UserName = ({ form, user }) => (
	<Form.Item hasFeedback label="Username">
		{getInput(form, user)}
	</Form.Item>
);

export default UserName;

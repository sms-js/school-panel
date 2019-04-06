import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SessionContext from 'components/SessionContext';
import { validateComponent } from 'lib/session';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const session = useContext(SessionContext.context);
	return (
		<Route
			{...rest}
			render={(props) =>
				session.logged === true ? (
					validateComponent(Component, session.user, { ...props, ...rest })
				) : (
					<Redirect to="/login" />
				)}
		/>
	);
};

export default PrivateRoute;

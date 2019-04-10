import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SessionContext from 'components/SessionContext';

// Public and Private route
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Screens
// Private screens
import Authenticated from 'screens/private/Authenticated';
import Home from 'screens/private/Home';
import Profile from 'screens/private/Profile';
// Users
import { UserEdition, UsersList } from 'screens/private/users';

// Public screens
import Example from 'screens/public/Example';
// System screens
import Login from 'screens/system/Login';
import Unauthorized from 'screens/system/Unauthorized';
import NoMatch from 'screens/system/NoMatch';
import { RecoverPassword, GenerateNewPassword } from 'screens/system/RecoverPassword/';

// Rules validation
// The authentication system, will fail if the rule is not defined in config/rules
// You can validate one rule with rule="myRule"
// You can validate more than one rule with rules={['myRule', 'Other']})
// If the "rules" property is received, the "rule" property will do nothing

/**
 * Returns an array containg all the system rules
 */
const systemRoutes = [
	<PublicRoute key="route-login-route" exact path="/login" component={Login} />,
	<PublicRoute key="route-recover-password" exact path="/recoverpassword/" component={RecoverPassword} />,
	<PublicRoute
		key="route-generate-new-password"
		exact
		path="/recoverpassword/generatenewpassword/:token"
		component={GenerateNewPassword}
	/>,
	<PrivateRoute key="route-home-route" exact path="/" component={Home} />,
	<PrivateRoute key="route-unauthorized-route" exact path="/unauthorized" component={Unauthorized} rule="*" />
];

/**
 * Returns an array containg all the private rules
 */
const privateRoutes = [
	<PrivateRoute key="route-home" path="/admin/home" component={Home} />,
	<PrivateRoute key="route-profile" path="/admin/profile" component={Profile} rule={[ 'Profile']} />,

	// Users
	<PrivateRoute key="route-users-list" path="/admin/users" component={UsersList} rule="UserFull" />,
	<PrivateRoute exact key="route-users-create" path="/admin/user" component={UserEdition} rule="UserFull" />,
	<PrivateRoute key="route-users-edit" path="/admin/user/:id" component={UserEdition} rule="UserFull" />
];

/**
 * Returns an array containg all the public rules
 */
const publicRoutes = [
	// Public route example
];

const Router = () => {
	return (
		<SessionContext.Provider>
			<BrowserRouter>
				<div style={{ width: '100%' }}>
					<Switch>
						{/* System routes */}
						{systemRoutes}
						{/* Private routes */}
						{privateRoutes}
						{/* Public routes */}
						{publicRoutes}
						{/* No match */}
						<Route component={NoMatch} />
					</Switch>
				</div>
			</BrowserRouter>
		</SessionContext.Provider>
	);
};

export default Router;

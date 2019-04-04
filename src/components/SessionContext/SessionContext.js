import React, { useReducer } from 'react';
import reducer from './reducer';
import { defaultSession, storedSession, setSession, removeSession } from 'lib/session';

const Context = React.createContext();

const Provider = ({ children, value }) => {
	const [session, dispatch] = useReducer(reducer, storedSession || defaultSession);

	const updateUser = user => dispatch({ type: 'updateUser', user });

	const add = response => {
		dispatch({ type: 'add', response });
		setSession(response);
	};

	const logout = () => {
		dispatch({ type: 'logout' });
		removeSession();
	};

	return <Context.Provider value={{ ...value, add, logout, updateUser, ...session }}>{children}</Context.Provider>;
};

const SessionContext = { Provider, Consumer: Context.Consumer, context: Context };

export default SessionContext;

import React, { useState, useEffect } from 'react';
import Router from './Router';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * This component is used to configure the app before it's rendered
 */
const Config = () => {
	const [loading, setLoading] = useState(true);

	// This will run on component update or unmount (does not run on first mount)
	const cleanUp = () => {
		//console.debug('[Config, cleanUp] cleaning up component');
	};

	useEffect(() => {
		// [Insert effects before app renders here]

		// Once apps ready set loading boolean in true
		setLoading(false);

		// Emulate loading time (comment setLoading line and uncomment next line)
		//setTimeout(() => setLoading(false), 1000);

		return cleanUp();
	}, []);

	return loading ? <CircularProgress /> : <Router />;
};

export default Config;

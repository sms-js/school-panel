import React, { useState, useEffect } from 'react';
import Router from './Router';
import CircularProgress from '@material-ui/core/CircularProgress';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from 'config/translations';

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
		const configuration = {
			resources,
			debug: false,
			lng: 'es',
			fallbackLng: 'es',
			react: {
				useSuspense: false
			},
			interpolation: {
				escapeValue: false
			}
		};
		// Once apps ready set loading boolean in true
		i18n
			.use(initReactI18next) // passes i18n down to react-i18next
			.init(configuration, () => {
				// Once apps ready set loading boolean in true
				console.log(configuration);

				setLoading(false);

				// Emulate loading time (comment setLoading line and uncomment next line)
				//setTimeout(() => setLoading(false), 1000);
			});

		// Emulate loading time (comment setLoading line and uncomment next line)
		//setTimeout(() => setLoading(false), 1000);

		return cleanUp();
	}, []);

	return loading ? (
		<CircularProgress />
	) : (
		<I18nextProvider i18n={i18n}>
			<Router />
		</I18nextProvider>
	);
};

export default Config;

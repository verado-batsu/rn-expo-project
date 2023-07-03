import 'react-native-gesture-handler';

import FlashMessage from "react-native-flash-message";
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux/store';
import { Main } from './src/components/Main/Main';

export default function App() {
	const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('./src/assets/fonts/roboto/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./src/assets/fonts/roboto/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./src/assets/fonts/roboto/Roboto-Medium.ttf'),
	});
	
	if (!fontsLoaded) {
        return null;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Main />
				<FlashMessage position="top" /> 
			</PersistGate>
		</Provider>
	);
}

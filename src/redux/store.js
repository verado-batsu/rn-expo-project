import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authReducer } from './auth/authSlice'

// clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// }

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['user']
};

const authPersistConfig = {
	key: 'user',
	storage: AsyncStorage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
})

const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
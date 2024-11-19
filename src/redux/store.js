import {configureStore} from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query';

import thunk from 'redux-thunk';
import {initSlice} from './slices/initSlice';

import {initApi} from '../services/initApi';

export const store = configureStore({
  reducer: {
    initReducer: initSlice.reducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(
  //     registerApi.middleware,
  //     businessApi.middleware,
  //     initApi.middleware,
  //   ),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

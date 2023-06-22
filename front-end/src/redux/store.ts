import { configureStore, ThunkAction, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, AuthState } from "./slice";
import { PersistPartial } from 'redux-persist/es/persistReducer';

interface PersistedAuthState extends PersistPartial, AuthState {}

const authPersistConfig = {
  key: "auth",
  storage,
  // whitelist: ['token'],
};

const persistedAuthReducer = persistReducer<PersistedAuthState, AnyAction>(
  authPersistConfig,
  authReducer as (state: AuthState | undefined, action: AnyAction) => PersistedAuthState
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const persistor: Persistor = persistStore(store);
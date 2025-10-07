import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Preload auth state from localStorage for persistence
const token = typeof localStorage !== 'undefined' ? localStorage.getItem("authToken") : null;
const role = typeof localStorage !== 'undefined' ? localStorage.getItem("authRole") : null;

const preloadedState = token && role ? {
  login: {
    admin: {
      loading: false,
      user: role === 'admin' ? { accessToken: token, role } : null,
      error: null,
    },
    seller: {
      loading: false,
      user: role === 'seller' ? { accessToken: token, role } : null,
      error: null,
    },
  },
} : undefined as any;

// Create store with middleware
export const store = createStore(rootReducer, preloadedState, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

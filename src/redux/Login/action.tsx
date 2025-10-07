import { LOGIN_REQUEST_ADMIN, LOGIN_SUCCESS_ADMIN, LOGIN_FAILURE_ADMIN } from "./actionTypes";
import { LOGIN_REQUEST_SELLER, LOGIN_SUCCESS_SELLER, LOGIN_FAILURE_SELLER } from "./actionTypes";
import { LOGOUT } from "./actionTypes";

export const loginRequestAdmin = (data: { email: string; password: string }) => ({
  type: LOGIN_REQUEST_ADMIN,
  payload: data,
});

export const loginSuccessAdmin = (user: any) => ({
  type: LOGIN_SUCCESS_ADMIN,
  payload: user,
});

export const loginFailureAdmin = (error: string) => ({
  type: LOGIN_FAILURE_ADMIN,
  payload: error,
});


export const loginRequestSeller = (data: { email: string; password: string }) => ({
  type: LOGIN_REQUEST_SELLER,
  payload: data,
});

export const loginSuccessSeller = (user: any) => ({
  type: LOGIN_SUCCESS_SELLER,
  payload: user,
});

export const loginFailureSeller = (error: string) => ({
  type: LOGIN_FAILURE_SELLER,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

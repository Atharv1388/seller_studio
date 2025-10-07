import { FETCH_SELLERS_REQUEST, FETCH_SELLERS_SUCCESS, FETCH_SELLERS_FAILURE} from "./actionTypes";
import {ADD_SELLERS_REQUEST ,ADD_SELLERS_SUCCESS, ADD_SELLERS_FAILURE } from "./actionTypes";

export const fetchSellersRequest = (data: { page: number; limit: number }) => ({
  type: FETCH_SELLERS_REQUEST,
  payload: data,
});

export const fetchSellersSuccess = (user: any) => ({
  type: FETCH_SELLERS_SUCCESS,
  payload: user,
});

export const fetchSellersFailure = (error: string) => ({
  type: FETCH_SELLERS_FAILURE,
  payload: error,
});


export const addSellerRequest = (data: { name: string; email: string; mobile: string; country: string; state: string; skills: string[]; password: string }) => ({
  type: ADD_SELLERS_REQUEST,
  payload: data,
});

export const addSellerSuccess = (user: any) => ({
  type: ADD_SELLERS_SUCCESS,
  payload: user,
});

export const addSellerFailure = (error: string) => ({
  type: ADD_SELLERS_FAILURE,
  payload: error,
});

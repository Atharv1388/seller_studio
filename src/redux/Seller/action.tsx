import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE } from "./actionTypes";
import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from "./actionTypes";
import { DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE } from "./actionTypes";

export const fetchProductRequest = (payload: { page?: number; limit?: number }) => ({
    type: FETCH_PRODUCT_REQUEST,
    payload,
});

export const fetchProductSuccess = (payload: { data: any[]; pagination: any }) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload,
});

export const fetchProductFailure = (error: string) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
});

export const addProductRequest = (payload: { name: string; description: string; brands: Array<{ name: string; detail: string; image?: string; price: number }> }) => ({
    type: ADD_PRODUCT_REQUEST,
    payload,
});

export const addProductSuccess = (product: any) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
});

export const addProductFailure = (error: string) => ({
    type: ADD_PRODUCT_FAILURE,
    payload: error,
});

export const deleteProductRequest = (productId: string) => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: productId,
});

export const deleteProductSuccess = (productId: string) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: productId,
});

export const deleteProductFailure = (error: string) => ({
    type: DELETE_PRODUCT_FAILURE,
    payload: error,
});

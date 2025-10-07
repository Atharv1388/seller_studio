import { call, put, takeLatest, select } from "redux-saga/effects";
import { fetchProductSuccess, fetchProductFailure } from "./action";
import { addProductSuccess, addProductFailure } from "./action";
import { deleteProductSuccess, deleteProductFailure } from "./action";
import { FETCH_PRODUCT_REQUEST, ADD_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST } from "./actionTypes";
import { getSellerProducts, createSellerProduct, deleteSellerProduct } from "@/Api/api";

function* fetchProductsSaga(action: any) {
    try {
        const params = action?.payload || {};
        const response = yield call(getSellerProducts, params);
        yield put(fetchProductSuccess(response.data));
    } catch (error: any) {
        yield put(fetchProductFailure(error.response?.data?.message || error.message));
    }
}

function* addProductSaga(action: any) {
    try {
        const response = yield call(createSellerProduct, action.payload);
        yield put(addProductSuccess(response.data));
        // Refresh list using current pagination from state
        const pagination = yield select((state: any) => state.seller?.pagination);
        const page = pagination?.page || 1;
        const limit = pagination?.limit || 10;
        // Reuse same saga by dispatching FETCH_PRODUCT_REQUEST
        yield put({ type: FETCH_PRODUCT_REQUEST, payload: { page, limit } });
    } catch (error: any) {
        yield put(addProductFailure(error.response?.data?.message || error.message));
    }
}

function* deleteProductSaga(action: any) {
    try {
        yield call(deleteSellerProduct, action.payload);
        yield put(deleteProductSuccess(action.payload));
        // Refresh list after delete
        const pagination = yield select((state: any) => state.seller?.pagination);
        const page = pagination?.page || 1;
        const limit = pagination?.limit || 10;
        yield put({ type: FETCH_PRODUCT_REQUEST, payload: { page, limit } });
    } catch (error: any) {
        yield put(deleteProductFailure(error.response?.data?.message || error.message));
    }
}

export default function* sellerSaga() {
    yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductsSaga);
    yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
    yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
}

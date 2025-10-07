import { call, put, takeLatest, select } from "redux-saga/effects";
import { FETCH_SELLERS_REQUEST, ADD_SELLERS_REQUEST } from "./actionTypes";
import { fetchSellersSuccess, fetchSellersFailure, addSellerSuccess, addSellerFailure, fetchSellersRequest } from "./action";
import { getSellers, createSeller } from "../../Api/api"; // axios instance

function* fetchSellersSaga(action: any): any {
  try {
    const response = yield call(getSellers, action.payload);
    yield put(fetchSellersSuccess(response.data)); // { data, pagination }
  } catch (error: any) {
    yield put(fetchSellersFailure(error.response?.data?.message || error.message));
  }
}

function* addSellerSaga(action: any): any {
  try {
    const response = yield call(createSeller, action.payload);
    yield put(addSellerSuccess(response.data));
    // Refresh list using current pagination from state
    const pagination = yield select((state: any) => state.admin?.pagination);
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    yield put(fetchSellersRequest({ page, limit }));
  } catch (error: any) {
    yield put(addSellerFailure(error.response?.data?.message || error.message));
  }
}

export function* watchFetchSellers() {
  yield takeLatest(FETCH_SELLERS_REQUEST, fetchSellersSaga);
}

export function* watchAddSeller() {
  yield takeLatest(ADD_SELLERS_REQUEST, addSellerSaga);
}

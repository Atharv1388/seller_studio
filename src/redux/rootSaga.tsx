import { all } from "redux-saga/effects";
import { watchLogin } from "./Login/saga";
import { watchFetchSellers, watchAddSeller } from "./Admin/saga";
import  sellerSaga  from "./Seller/saga";

export default function* rootSaga() {
  yield all([watchLogin(), watchFetchSellers(), watchAddSeller(), sellerSaga()]);
}

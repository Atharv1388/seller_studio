import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST_ADMIN} from "./actionTypes";
import { LOGIN_REQUEST_SELLER} from "./actionTypes";
import { loginSuccessAdmin, loginFailureAdmin, loginSuccessSeller, loginFailureSeller } from "./action";
import { adminLogin, sellerLogin } from "../../Api/api"; // axios instance

function* loginSaga(action: any): any {
  try {
    const response = yield call(adminLogin, action.payload);
    const envelope = response.data; // { success, status, message, data }
    const data = envelope?.data; // { accessToken, role }
    // persist
    if (data?.accessToken) {
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("authRole", data.role || "admin");
    }
    yield put(loginSuccessAdmin(data));
  } catch (error: any) {
    yield put(loginFailureAdmin(error.response?.data?.message || error.message));
  }
}

function* loginSagaSeller(action: any): any {
  try {
    const response = yield call(sellerLogin, action.payload);
    const envelope = response.data;
    const data = envelope?.data; // { accessToken, role }
    if (data?.accessToken) {
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("authRole", data.role || "seller");
    }
    yield put(loginSuccessSeller(data));
  } catch (error: any) {
    yield put(loginFailureSeller(error.response?.data?.message || error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST_ADMIN, loginSaga);
  yield takeLatest(LOGIN_REQUEST_SELLER, loginSagaSeller);
}

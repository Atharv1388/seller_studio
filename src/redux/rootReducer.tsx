import { combineReducers } from "redux";
import { loginReducer } from "./Login/reducer";
import { adminReducer } from "./Admin/reducer";
import { sellerReducer } from "./Seller/reducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  admin: adminReducer,
  seller: sellerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

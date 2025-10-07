import { LOGIN_REQUEST_ADMIN, LOGIN_SUCCESS_ADMIN, LOGIN_FAILURE_ADMIN } from "./actionTypes";
import { LOGIN_REQUEST_SELLER, LOGIN_SUCCESS_SELLER, LOGIN_FAILURE_SELLER } from "./actionTypes";
import { LOGOUT } from "./actionTypes";

interface LoginState {
  admin: {
    loading: boolean;
    user: any;
    error: string | null;
  };
  seller: {
    loading: boolean;
    user: any;
    error: string | null;
  };
}

const initialState: LoginState = {
  admin: {
    loading: false,
    user: null,
    error: null,
  },
  seller: {
    loading: false,
    user: null,
    error: null,
  },
};

export const loginReducer = (state = initialState, action: any): LoginState => {
    switch (action.type) {
      case LOGIN_REQUEST_ADMIN:
        return { ...state, admin: { loading: true, user: null, error: null } };
      case LOGIN_SUCCESS_ADMIN:
        return { ...state, admin: { loading: false, user: action.payload, error: null } };
      case LOGIN_FAILURE_ADMIN:
        return { ...state, admin: { loading: false, user: null, error: action.payload } };

      case LOGIN_REQUEST_SELLER:
        return { ...state, seller: { loading: true, user: null, error: null } };
      case LOGIN_SUCCESS_SELLER:
        return { ...state, seller: { loading: false, user: action.payload, error: null } };
      case LOGIN_FAILURE_SELLER:
        return { ...state, seller: { loading: false, user: null, error: action.payload } };

      case LOGOUT:
        return {
          admin: { loading: false, user: null, error: null },
          seller: { loading: false, user: null, error: null },
        };

        default:
        return state;
    }
};

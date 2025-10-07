import { FETCH_SELLERS_REQUEST, FETCH_SELLERS_SUCCESS, FETCH_SELLERS_FAILURE } from "./actionTypes";
import { ADD_SELLERS_REQUEST, ADD_SELLERS_SUCCESS, ADD_SELLERS_FAILURE } from "./actionTypes";

interface AdminState {
  admin: {
    loading: boolean;
    user: any;
    error: string | null;
  };
  sellers: any[];
  pagination: { page: number; limit: number; total: number; pages: number } | null;
}

const initialState: AdminState = {
  admin: {
    loading: false,
    user: null,
    error: null,
  },
  sellers: [],
  pagination: null,
};

export const adminReducer = (state = initialState, action: any): AdminState => {
    switch (action.type) {
      case FETCH_SELLERS_REQUEST:
        return { ...state, admin: { ...state.admin, loading: true, error: null } };
      case FETCH_SELLERS_SUCCESS:
        return { 
          ...state, 
          admin: { ...state.admin, loading: false, error: null },
          sellers: action.payload?.data || [],
          pagination: action.payload?.pagination || null,
        };
      case FETCH_SELLERS_FAILURE:
        return { ...state, admin: { ...state.admin, loading: false, error: action.payload } };

      case ADD_SELLERS_REQUEST:
        return { ...state, admin: { ...state.admin, loading: true, error: null } };
      case ADD_SELLERS_SUCCESS:
        return { ...state, admin: { ...state.admin, loading: false, error: null } };
      case ADD_SELLERS_FAILURE:
        return { ...state, admin: { ...state.admin, loading: false, error: action.payload } };

        default:
        return state;
    }
};

import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE } from "./actionTypes";
import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from "./actionTypes";
import { DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE } from "./actionTypes";

interface SellerState {
    products: any[];
    loading: boolean;
    error: string | null;
    pagination: { page: number; limit: number; total: number; pages: number } | null;
}

const initialState: SellerState = {
    products: [],
    loading: false,
    error: null,
    pagination: null,
};

export const sellerReducer = (state = initialState, action: any): SellerState => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: action.payload?.data || [], pagination: action.payload?.pagination || null };
        case FETCH_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case ADD_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case ADD_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

            
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

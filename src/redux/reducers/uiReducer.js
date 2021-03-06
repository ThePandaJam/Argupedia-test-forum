//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/redux/reducers/uiReducer.js
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from "../types";

const initialState = {
    uiLoading: false,
    uiErrors: {}
};

export default function uiReducer(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                uiLoading: false,
                uiErrors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                uiLoading: false,
                uiErrors: null
            };
        case LOADING_UI:
            return {
                ...state,
                uiLoading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                uiLoading: false
            }
        default:
            return state;
    }
}
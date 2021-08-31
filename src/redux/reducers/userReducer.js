//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/redux/reducers/userReducer.js
import { 
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    UPVOTE_POST,
    DOWNVOTE_POST,
    UNUPVOTE_POST,
    UNDOWNVOTE_POST,
    MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    upvotes: [],
    downvotes: [],
    notifications: []
}

export default function userReducer( state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return{
                ...state,
                loading: true
            }
        case UPVOTE_POST:
            return{
                ...state,
                upvotes: [
                    ...state.upvotes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNUPVOTE_POST:
            return {
                ...state,
                upvotes: state.upvotes.filter(
                    (upvote) => upvote.postId !== action.payload.postId
                )
            }
        case DOWNVOTE_POST:
            return{
                ...state,
                downvotes: [
                    ...state.downvotes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNDOWNVOTE_POST:
            return {
                ...state,
                downvotes: state.downvotes.filter(
                    (downvote) => downvote.postId !== action.payload.postId
                )
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((notif) => (notif.read = true));
            return{
                ...state
            }
        default:
            return state;
    }
}
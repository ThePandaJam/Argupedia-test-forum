//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/redux/reducers/dataReducer.js
import { 
    SET_POSTS, 
    SET_POST, 
    UPVOTE_POST, 
    UNUPVOTE_POST, 
    DOWNVOTE_POST, 
    UNDOWNVOTE_POST, 
    LOADING_DATA, 
    DELETE_POST,
    CREATE_POST,
    SUBMIT_COMMENT,
    UPVOTE_COMMENT,
    UNUPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    UNDOWNVOTE_COMMENT,
    SET_SCHEMES,
    SET_SCHEME_INFO
} from "../types";

const initialState = {
    posts: [],
    schemes:[],
    post: {},
    schemeInfo: {
        premisesAndConclusion: {},
        criticalQuestions:[]
    },
    comment: {},
    loading: true
};

export default function dataReducer(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            };
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            };
        case SET_SCHEMES:
            return{
                ...state,
                schemes: action.payload,
                loading: false
            };
        case SET_POST:
            return{
                ...state,
                post: action.payload,
                //loading: false
            };
        case SET_SCHEME_INFO:
            return{
                ...state,
                schemeInfo: action.payload,
                loading: false
            }
        case UPVOTE_POST:
        case UNUPVOTE_POST:
        case DOWNVOTE_POST:
        case UNDOWNVOTE_POST:
            //find the index of the post being rated
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload
            if(state.post.postId === action.payload.postId) {
                let comments = state.post.comments;
                state.post = action.payload;
                state.post.comments = comments;
              }
            return{
                ...state
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.postId !== action.payload)
              }
        case CREATE_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                //add new comment to the comment array in the post
                post: {
                    ...state.post,
                    comments: [
                        action.payload,
                        ...state.post.comments
                    ]
                }
            }
        // reducer for rating comments
        case UPVOTE_COMMENT:
        case UNUPVOTE_COMMENT:
        case DOWNVOTE_COMMENT:
        case UNDOWNVOTE_COMMENT:
            let commentIndex = state.post.comments.findIndex((comment) => comment.argumentId === action.payload.argumentId);
            state.post.comments[commentIndex] = action.payload
            if(state.comment.argumentId === action.payload.argumentId) {
                state.comment = action.payload;
                }
            return{
                ...state
            }
        default:
            return state;
    }
}
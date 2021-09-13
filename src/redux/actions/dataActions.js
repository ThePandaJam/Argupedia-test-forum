// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/redux/actions/dataActions.js
import {
    SET_POSTS,
    SET_POST, 
    SET_SCHEMES,
    SET_SCHEME_INFO,
    CREATE_POST, 
    LOADING_DATA, 
    UPVOTE_POST, 
    UNUPVOTE_POST, 
    DOWNVOTE_POST, 
    UNDOWNVOTE_POST, 
    DELETE_POST, 
    LOADING_UI,
    STOP_LOADING_UI, 
    SET_ERRORS, 
    CLEAR_ERRORS,
    SUBMIT_COMMENT,
    UPVOTE_COMMENT,
    UNUPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    UNDOWNVOTE_COMMENT
} from '../types';
import axios from 'axios';

//get all posts
export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload:[]
            })
        })
}

//get one post
export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.get(`/post/${postId}`)
        .then(res => {
            dispatch({
                type: SET_POST,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI})
        })
        .catch(err => console.log(err));
}

//get all schemes
export const getSchemes = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get('/schemes')
        .then(res => {
            dispatch({
                type: SET_SCHEMES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCHEMES,
                payload:[]
            })
        })
}

//get scheme and critical questions for one post
export const getSchemeInfo = (schemeId) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/schemeData/${schemeId}`)
        .then(res => {
            dispatch({
                type: SET_SCHEME_INFO,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCHEME_INFO,
                payload:[]
            })
        })
}

//make a post
export const createPost = (newPost, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/post', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
            dispatch(clearErrors())
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//upvote a post
export const upvotePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/upvote`)
        .then(res => {
            dispatch({
                type: UPVOTE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
//unupvote a post
export const unUpvotePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/unupvote`)
        .then(res => {
            dispatch({
                type: UNUPVOTE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//downvote post
export const downvotePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/downvote`)
        .then(res => {
            dispatch({
                type: DOWNVOTE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//undownvote post
export const unDownvotePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/undownvote`)
        .then(res => {
            dispatch({
                type: UNDOWNVOTE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
//submit a comment (argument)
export const submmitComment = (postId, commentData) => (dispatch) => {
    axios.post(`/post/${postId}/argument`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

//delete post
export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({
                type:DELETE_POST,
                payload: postId
            })
        })
        .catch(err => console.log(err));
}

//upvote a comment
export const upvoteArgument = (argumentId) => (dispatch) => {
    axios.get(`/argument/${argumentId}/upvote`)
        .then(res => {
            dispatch({
                type: UPVOTE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//unupvote a comment
export const unUpvoteArgument = (argumentId) => (dispatch) => {
    axios.get(`/argument/${argumentId}/unupvote`)
        .then(res => {
            dispatch({
                type: UNUPVOTE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//downvote comment
export const downvoteArgument = (argumentId) => (dispatch) => {
    axios.get(`/argument/${argumentId}/downvote`)
        .then(res => {
            dispatch({
                type: DOWNVOTE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//undownvote comment
export const unDownvoteArgument = (argumentId) => (dispatch) => {
    axios.get(`/argument/${argumentId}/undownvote`)
        .then(res => {
            dispatch({
                type: UNDOWNVOTE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//get user profile information
export const getUserProfile = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null
            })
        })
}

//clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
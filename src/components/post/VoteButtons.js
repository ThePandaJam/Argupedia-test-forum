//based on  https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/LikeButton.js
import React, { useState }from 'react'
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { upvotePost, unUpvotePost, downvotePost, unDownvotePost } from '../../redux/actions/dataActions';

//icons
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function VoteButtons(props) {
    const dispatch = useDispatch()
    const { postId, userScore } = props
    //TODO: clean up user into state
    const {
        user: {
            authenticated,
            upvotes,
            downvotes
        },
    } = useSelector((state) => state);

    const [upvoted, setUpvoted] = useState(upvotedPost());
    const [downvoted, setDownvoted] = useState(downvotedPost());

    function upvotedPost() {
        if(upvotes && upvotes.find(upvote => upvote.postId === postId)){
            //setUpvoted(true)
            return true
        } else {
            //setUpvoted(false)
            return false
        }
    };

    function downvotedPost() {
        if(downvotes && downvotes.find(downvote => downvote.postId === postId)){
            //setDownvoted(true) 
            return true
        } else {
            //setDownvoted(false) 
            return false
        }
    };

    //sort out the logic where if post is downvoted, undownvote post and only then upvote it
    //upvote function
    function upvoteThisPost(){
        //if the post already has a downvote, remove downvote and add upvote
        if(downvoted){
            unDownvoteThisPost()
        }
        //add upvote in the db
        dispatch(upvotePost(postId))
        //add upvote in the ui
        setUpvoted(true)
    }

    //remove upvote funciton
    function unUpvoteThisPost(){
        //remove upvote in the db
        dispatch(unUpvotePost(postId))
        //remove upvote in the ui
        setUpvoted(false)
    }

    //downvote function
    function downvoteThisPost(){
        //if the post already has an upvote, remove upvote and add downvote
        if(upvoted){
            //run remove upvote function
            unUpvoteThisPost()
        }
        //add downvote in the db
        dispatch(downvotePost(postId))
        //add downvote in the ui
        setDownvoted(true)
    }
    
    //remove downvote function
    function unDownvoteThisPost(){
        //remove downvote in the db
        dispatch(unDownvotePost(postId))
        //remove downvote in the UI
        setDownvoted(false)
    }


    return (
        <div>
            {!authenticated
                    ? (
                        <Link to="/login">
                            <MyButton tip="Upvote">
                                <ThumbUpOutlinedIcon color="primary"/>
                            </MyButton>
                        </Link>
                    ) 
                    : (
                        upvoted
                            ? (
                                <MyButton tip="Undo upvote" onClick={unUpvoteThisPost}>
                                    <ThumbUpIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Upvote" onClick={upvoteThisPost}>
                                    <ThumbUpOutlinedIcon color="primary"/>
                                </MyButton>
                            )
                    )
                }
                <span>{userScore} {userScore === 1 ? 'point' : 'points'}</span>
                {!authenticated
                    ? (
                        <Link to="/login">
                            <MyButton tip="Downvote">
                                <ThumbDownOutlinedIcon color="primary"/>
                            </MyButton>
                        </Link>
                            
                    ) 
                    : (
                        downvoted 
                            ? (
                                <MyButton tip="Undo downvote" onClick={unDownvoteThisPost}>
                                    <ThumbDownIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Downvote" onClick={downvoteThisPost}>
                                    <ThumbDownOutlinedIcon color="primary"/>
                                </MyButton>
                            )
                    )
                }
        </div>
    )
}

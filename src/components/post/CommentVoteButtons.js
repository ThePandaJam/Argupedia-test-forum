//based on  https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/LikeButton.js
import React, { useState }from 'react'
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { upvoteArgument, unUpvoteArgument, downvoteArgument, unDownvoteArgument } from '../../redux/actions/dataActions';

//icons
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function CommentVoteButtons(props) {
    const dispatch = useDispatch()
    const { argumentId, argumentScore } = props
    //TODO: clean up user into state
    const {
        user: {
            authenticated,
            argumentUpvotes,
            argumentDownvotes
        },
    } = useSelector((state) => state);

    const [upvoted, setUpvoted] = useState(upvotedArgument());
    const [downvoted, setDownvoted] = useState(downvotedArgument());

    function upvotedArgument() {
        if(argumentUpvotes && argumentUpvotes.find(upvote => upvote.argumentId === argumentId)){
            return true
        } else {
            return false
        }
    };

    function downvotedArgument() {
        if(argumentDownvotes && argumentDownvotes.find(downvote => downvote.argumentId === argumentId)){
            return true
        } else {
            return false
        }
    };

    //upvote function
    function upvoteThisArgument(){
        //if the argument already has a downvote, remove downvote and add upvote
        if(downvoted){
            unDownvoteThisArgument()
        }
        //add upvote in the db
        dispatch(upvoteArgument(argumentId))
        console.log("Argument upvoted")
        //add upvote in the ui
        setUpvoted(true)
    }

    //remove upvote funciton
    function unUpvoteThisArgument(){
        //remove upvote in the db
        dispatch(unUpvoteArgument(argumentId))
        console.log("Argument un-upvoted")
        //remove upvote in the ui
        setUpvoted(false)
    }

    //downvote function
    function downvoteThisArgument(){
        //if the argument already has an upvote, remove upvote and add downvote
        if(upvoted){
            //run remove upvote function
            unUpvoteThisArgument()
        }
        //add downvote in the db
        dispatch(downvoteArgument(argumentId))
        console.log("Argument downvoted")
        //add downvote in the ui
        setDownvoted(true)
    }
    
    //remove downvote function
    function unDownvoteThisArgument(){
        //remove downvote in the db
        dispatch(unDownvoteArgument(argumentId))
        console.log("Argument un-downvoted")
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
                                <MyButton tip="Undo upvote" onClick={unUpvoteThisArgument}>
                                    <ThumbUpIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Upvote" onClick={upvoteThisArgument}>
                                    <ThumbUpOutlinedIcon color="primary"/>
                                </MyButton>
                            )
                    )
                }
                <span>{argumentScore} {argumentScore === 1 ? 'point' : 'points'}</span>
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
                                <MyButton tip="Undo downvote" onClick={unDownvoteThisArgument}>
                                    <ThumbDownIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Downvote" onClick={downvoteThisArgument}>
                                    <ThumbDownOutlinedIcon color="primary"/>
                                </MyButton>
                            )
                    )
                }
        </div>
    )
}

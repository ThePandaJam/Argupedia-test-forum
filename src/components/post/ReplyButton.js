import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCommentResponse } from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton'

//icons
import ReplyIcon from '@material-ui/icons/Reply';


export default function ReplyButton(props) {
    const dispatch = useDispatch()
    const { authenticated } = useSelector((state) => state.user);

    const {responseId} = props
    function setResponseId(){
        //set id to the comment selected for response
        dispatch(setCommentResponse(responseId)) 
        console.log("responding to comment id: "+ responseId)
        window.scrollTo(0, 0)
    }

    return (
        authenticated ? (
            <MyButton tip="Reply" onClick={setResponseId}>
                <ReplyIcon color="primary" />
            </MyButton>
        ) : (
            null
        )
    )
}

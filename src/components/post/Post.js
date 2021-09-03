// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/Scream.js
import React, { useState }from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';
import DeletePostButton from './DeletePostButton';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { upvotePost, unUpvotePost, downvotePost, unDownvotePost } from '../../redux/actions/dataActions'; 

//icons
import ChatIcon from '@material-ui/icons/Chat'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

//MUI general imports
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';

//MUI card imports
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding:25,
        objectFit: 'cover'
    },
    expandButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: '20px',
        marginBottom: '20px',
    },
}

function Post(props) {
    const dispatch = useDispatch()
    const {
        user: {
            authenticated,
            credentials :{
                handle
            },
            upvotes,
            downvotes
        },
    } = useSelector((state) => state);
    const { 
        classes,
        //openDialog,
        post: {
            body, 
            createdAt, 
            userImage, 
            userHandle, 
            postId, 
            userScore, 
            argumentCount},
    } = props

    const [upvoted, setUpvoted] = useState(upvotedPost());
    const [downvoted, setDownvoted] = useState(downvotedPost());
    dayjs.extend(relativeTime)

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
        <Card className={classes.card}>
            <CardMedia
            image = {userImage}
            title = "Profile image"
            className={classes.image} />
            <CardContent className={classes.content}>
                <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                {authenticated && userHandle === handle && <DeletePostButton postId={postId}/>}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
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
                <span>{userScore} points</span>
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
                <MyButton tip="Arguments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{argumentCount} arguments</span>
                
            </CardContent>
            <Link to={`/posts/${postId}`} >
                    <MyButton tip="Open full post" className={classes.expandButton}>
                        <ZoomOutMapIcon color="primary" />
                    </MyButton>
                </Link>
        </Card>
    )
}

export default withStyles(styles)(Post)
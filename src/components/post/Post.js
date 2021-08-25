import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton';
import DeletePostButton from './DeletePostButton';
import PostDialog from './PostDialog';

//redux
import { connect } from 'react-redux';
import { upvotePost, unUpvotePost, downvotePost, unDownvotePost } from '../../redux/actions/dataActions'; 

//icons
import ChatIcon from '@material-ui/icons/Chat'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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
    }
}

function Post(props) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const { 
        classes, 
        post : {
            body, 
            createdAt, 
            userImage, 
            userHandle, 
            postId, 
            userScore, 
            argumentCount},
        user: {
            authenticated,
            credentials :{
                handle
            },
            upvotes,
            downvotes
        },
        } = props
    dayjs.extend(relativeTime)

    function upvotedPost() {
        if(upvotes && upvotes.find(upvote => upvote.postId === postId)){
            setUpvoted(true)
        } else {
            setUpvoted(false)
        }
    };

    function downvotedPost() {
        if(downvotes && downvotes.find(downvote => downvote.postId === postId)){
            setDownvoted(true) 
        } else {
            setDownvoted(false) 
        }
    };
    //sort out the logic where if post is downvoted, undownvote post and only then upvote it
    function upvotePost(){
        if(downvotedPost()){
            props.unDownvotePost(postId)
        }
        props.upvotePost(postId)
    }
    function unUpvotePost(){
        props.unUpvotePost(postId)
    }

    //sort out the logic where if a post is upvoted, unupvote it and only then downvote it
    function downvotePost(){
        if(upvotedPost()){
            props.unUpvotePost(postId)
        }
        props.downvotePost(postId)
    }
    function unDownvotePost(){
        props.unDownvotePost(postId)
    }

    useEffect(() => {
        upvotedPost()
    }, [])
    
    useEffect(() => {
        downvotedPost()
    }, [])
        
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
                                <MyButton tip="Undo upvote" onClick={unUpvotePost}>
                                    <ThumbUpIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Upvote" onClick={upvotePost}>
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
                                <MyButton tip="Undo downvote" onClick={unDownvotePost}>
                                    <ThumbDownIcon color="primary"/>
                                </MyButton>
                            ) 
                            : (
                                <MyButton tip="Downvote" onClick={downvotePost}>
                                    <ThumbDownOutlinedIcon color="primary"/>
                                </MyButton>
                            )
                    )
                }
                <MyButton tip="Arguments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{argumentCount} arguments</span>
                <PostDialog postId={postId} userHandle={userHandle}/>
            </CardContent>
        </Card>
    )
}

Post.propTypes = {
    upvotePost: PropTypes.func.isRequired,
    unUpvotePost: PropTypes.func.isRequired,
    downvotePost: PropTypes.func.isRequired,
    unDownvotePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    upvotePost,
    unUpvotePost,
    downvotePost,
    unDownvotePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))
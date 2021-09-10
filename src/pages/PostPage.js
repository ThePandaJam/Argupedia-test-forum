import React, { Fragment, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import dayjs from 'dayjs';
import Comments from '../components/post/Comments';
import CommentForm from '../components/post/CommentForm';
import VoteButtons from '../components/post/VoteButtons';

//MUI imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    postPage: {
        textAlign: 'center'
    },
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    profileImage: {
        maxWidth: 150,
        maxHeight: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    postPageContent: {
        padding:20
    },
    spinnerDiv: {
        position: 'relative',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 50
    },
    commentSeparator: {
        border: 'none',
        width: '100%',
        marginTop: 20
    },
})

function PostPage(props) {
    const { classes } = props

    const dispatch = useDispatch();
    let {currentPostId} = useParams();

    const { 
        postId, 
        title,
        scheme,
        majorPremise,
        minorPremise,
        conclusion, 
        createdAt,
        userScore, 
        argumentCount, 
        userImage, 
        userHandle, 
        comments
    } = useSelector((state) => state.data.post);  
    const { UI: { uiLoading } } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getPost(currentPostId))
    }, [currentPostId])


    return (
        <Fragment>
            {uiLoading 
            ? (<div className={classes.spinnerDiv}>
                    <CircularProgress size={200} thickness={2}/>
                    <Typography variant="h4">Loading post...</Typography>
                </div>
                )
            : (<Grid container spacing={2} className={classes.postPageContent}>
                    <Grid item sm={3}>
                        <img src={userImage} alt="profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={9}>
                        <Typography 
                        component={Link} 
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                        >
                            {userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            Scheme: {scheme}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Arguments: {argumentCount}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="h5">
                            <b>{title}</b>
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            <b>Major Premise:</b> {majorPremise}
                        </Typography>
                        <Typography variant="body1">
                            <b>Minor Premise:</b> {minorPremise}
                        </Typography>
                        <Typography variant="body1">
                            <b>Conclusion:</b> {conclusion}
                        </Typography>
                        <VoteButtons postId={postId} userScore={userScore} />
                    </Grid>
                    <hr className={classes.commentSeparator}/>
                    <Typography variant="h4" color="primary">Arguments:</Typography>
                    <hr className={classes.visibleSeparator}/>
                    <CommentForm postId={postId}/>
                    <Comments comments={comments}/>
                </Grid>
                )
            }
        </Fragment>
        
    )
}

export default withStyles(styles)(PostPage)
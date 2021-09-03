//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/ScreamDialog.js
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

//MUI imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//icons
import CloseIcon from '@material-ui/icons/Close';


//redux
import { useDispatch, useSelector } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

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
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding:20
    },
    closeButton: {
        right: '0',
        marginRight: '20px',
        top:'15px',
        position: 'absolute'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

function PostDialog(props) {
    const dispatch = useDispatch();
    const { 
        classes,
        currentPostId,
        opUserHandle,
        openDialog
    } = props
    const { 
        postId, 
        body, 
        createdAt,
        userScore, 
        argumentCount, 
        userImage, 
        userHandle, 
        comments
    } = useSelector((state) => state.data.post);  
    
    const { UI: { loading } } = useSelector((state) => state);
    const [open, setOpen] = useState(false);
    const [oldPath, setOldPath] = useState("")
    const [postDataReceived, setPostDataReceived] = useState(false)
    
    function handleOpen(){
        const oldPathName = window.location.pathname
        const newPathName = `/users/${opUserHandle}/post/${currentPostId}`
        
        if(oldPathName === newPathName){
            setOldPath(`/users/${opUserHandle}`);
        } else {
            setOldPath(oldPathName);

        }

        setOpen(true)
        dispatch(getPost(currentPostId))
        window.history.pushState(null, null, newPathName);
    }

    function handleClose(){
        setPostDataReceived(false)
        setOpen(false)
        dispatch(clearErrors())
        window.history.pushState(null, null, oldPath);
    }

    useEffect(() => {
        if(openDialog && !postDataReceived){
            setPostDataReceived(true)
            return handleOpen()
        }
    }, [])

    return (
        <Fragment>
            
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">
                    <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                <DialogTitle>
                    Argupedia post
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {loading 
                        ? (<div className={classes.spinnerDiv}>
                                <CircularProgress size={200} thickness={2}/>
                            </div>
                            )
                        : (<Grid container spacing={10}>
                                <Grid item sm={5}>
                                    <img src={userImage} alt="profile" className={classes.profileImage} />
                                </Grid>
                                <Grid item sm={7}>
                                    <Typography 
                                    component={Link} 
                                    color="primary"
                                    variant="h5"
                                    to={`/users/${userHandle}`}
                                    >
                                        @{userHandle}
                                    </Typography>
                                    <hr className={classes.invisibleSeparator}/>
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                    </Typography>
                                    <hr className={classes.invisibleSeparator}/>
                                    <Typography variant="body2" color="textSecondary">
                                        Post score: {userScore} points
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Arguments: {argumentCount}
                                    </Typography>
                                    <hr className={classes.invisibleSeparator}/>
                                    <Typography variant="body1">
                                        {body}
                                    </Typography>
                                </Grid>
                                <hr className={classes.visibleSeparator}/>
                                <CommentForm postId={postId} />
                                <Comments comments={comments}/>
                            </Grid>
                        )
                    }
                </DialogContent>  
            </Dialog>
        </Fragment>
    )
}


export default withStyles(styles)(PostDialog)

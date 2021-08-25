import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
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
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';


//redux
import { connect } from 'react-redux';
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
    expandButton: {
        position: 'absolute',
        right: '0',
        marginRight: '20px',
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

function PostDialog(props) {
    const { 
        classes, 
        UI: { loading },
        post: {postId, body, createdAt, userScore, argumentCount, userImage, userHandle, comments }
    } = props
    const [open, setOpen] = useState(false);
    
    function handleOpen(){
        setOpen(true)
        props.getPost(props.postId)
    }

    function handleClose(){
        setOpen(false)
        props.clearErrors()
    }

    return (
        <Fragment>
            <MyButton tip="Open full post" tipClassName={classes.expandButton} onClick={handleOpen}>
                <ZoomOutMapIcon color="primary" />
            </MyButton>
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


PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
})

const mapAcitonsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapAcitonsToProps)(withStyles(styles)(PostDialog))

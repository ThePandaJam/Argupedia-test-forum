import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentVoteButtons from './CommentVoteButtons'
import MyButton from '../../util/MyButton';
import { setCommentResponse } from '../../redux/actions/dataActions';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

//icons
import ReplyIcon from '@material-ui/icons/Reply';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    commentImage: {
        maxwidth: '90%',
        height: 100,
        width: 100,
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: 30
    },
    commentData: {

        margin: '0px 10px 40px 20px',
        width: '90%',
        objectFit: 'cover',
        whiteSpace: 'pre-wrap',
    },
    replyButton: {
        position: 'absolute',
        textAlign: 'right',
        right: 0,
        marginRight: '60px',
    },
})

function Comment(props) {
    const dispatch = useDispatch()

    const {
        user: {
            authenticated,
            commentUpvotes,
            commentDownvotes
        },
    } = useSelector((state) => state);
    
    const { 
        classes,
        comment: {
            argumentId,
            body,
            userHandle,
            userImage,
            createdAt,
            argumentScore},
    } = props

    dayjs.extend(relativeTime)

    function setResponseId(){
        //set id to the comment selected for response
        dispatch(setCommentResponse(argumentId)) 
        console.log("responding to comment id: "+ argumentId)
        window.scrollTo(0, 0)
    }

    return (
        <Grid item sm={12}>
            <Grid container>
                <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage}/>
                </Grid>
                <Grid item sm={9}>
                    <div className={classes.commentData}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary">
                            {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">{body}</Typography>
                        <Grid container>
                            <Grid item sm={8}>
                                <CommentVoteButtons argumentId={argumentId} argumentScore={argumentScore} />
                            </Grid>
                            <Grid item sm={1} className={classes.replyButton}>
                                {authenticated ? (
                                    <MyButton tip="Reply" onClick={setResponseId}>
                                        <ReplyIcon color="primary" />
                                    </MyButton>
                                    ) : (
                                        null
                                    )
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Comment)
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentVoteButtons from './CommentVoteButtons'

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

//icons
import ReplyButton from './ReplyButton';

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

    const {
        user: {
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
                                <ReplyButton responseId={argumentId} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Comment)
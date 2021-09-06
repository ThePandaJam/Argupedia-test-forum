import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';
import CommentVoteButtons from './CommentVoteButtons'

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

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
        marginLeft: 40,
        marginBottom: 10
    }
})

function Comment(props) {
    const {
        user: {
            authenticated,
            credentials :{
                handle
            },
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
                        <CommentVoteButtons argumentId={argumentId} argumentScore={argumentScore} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Comment)
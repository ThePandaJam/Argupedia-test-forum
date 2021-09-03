//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/Comments.js
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';


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


function Comments(props) {
    const { classes } = props
    const { comments } = useSelector((state) => state.data.post);
    return (
        <Grid container>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => {
                    const{ body, createdAt, userImage, userHandle} = comment;
                    return(
                        <Fragment key={createdAt}>
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
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length -1 && (
                                <hr className={classes.visibleSeparator}/>
                            )}
                        </Fragment>
                    )
                })
            ) : (
                <Typography variant="body1">No responses</Typography>
            )
            
            }
        </Grid>
    )
}

export default (withStyles(styles)(Comments))


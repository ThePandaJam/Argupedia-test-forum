// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/Scream.js
import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';
import DeletePostButton from './DeletePostButton';
import VoteButtons from './VoteButtons';

//redux
import { useSelector } from 'react-redux';

//icons
import ChatIcon from '@material-ui/icons/Chat'
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
        post: {
            title, 
            createdAt, 
            userImage, 
            userHandle, 
            postId, 
            userScore, 
            argumentCount},
    } = props

    dayjs.extend(relativeTime)
        
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
                <Typography variant="body1">{title}</Typography>
                <VoteButtons postId={postId} userScore={userScore} />
                <MyButton tip="Arguments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{argumentCount} {argumentCount === 1 ? 'argument' : 'arguments'}</span>
                
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
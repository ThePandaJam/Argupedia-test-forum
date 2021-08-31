// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/pages/home.js
import Grid from '@material-ui/core/Grid'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

//components
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton'

export default function HomePage(props) {    
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

//TODO handle real-time updating of the database
    
    let recentPostsMarkup = 
        loading ? (
            <PostSkeleton />
        ) : (
            posts.map(post => (
                <Post key={post.postId} post={post} />
            ))
        )

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {recentPostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}
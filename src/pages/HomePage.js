import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

//components
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

export default function HomePage() {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])
//TODO handle real-time updating of the database
    
    if (loading) {
        return(
            <Grid container alignItems='center'>
                <Grid item sm={12} xs={12}>
                    <CircularProgress />
                    <p>loading...</p>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {posts.map((post) => (
                    <Post key={post.postId} post={post} />
                ))}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}

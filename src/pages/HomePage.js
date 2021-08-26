import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
//import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PropTypes from 'prop-types'

//components
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

export default function HomePage(props) {
    //const { posts, loading } = props.data
    
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.data);

    // useEffect(() => {
    //     const unsubscribe = props.getPosts();
    //     return unsubscribe
    // }, [])

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
// HomePage.propTypes = {
//     getPosts: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     data: state.data
// })

// export default connect(mapStateToProps, { getPosts})(HomePage);
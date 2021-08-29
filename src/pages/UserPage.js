import React, { useEffect, useState,  } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

//MUI imports
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';

export default function UserPage(props) {
    let {userHandle} = useParams();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.data);
    const [profile, setProfile] = useState({})
    const [userPosts, setPosts] = useState([])

    //TODO: review this function
    useEffect(() => {        
        axios.get(`/user/${userHandle}`)
            .then(res => {
                setProfile(res.data.user);
                setPosts(res.data.posts);
            })
            .catch(err => {
                console.log(err);
            })
    }, [dispatch, userHandle])
    
    if (loading) {
        return(
            <Grid container alignItems='center'>
                <Grid item sm={12} xs={12}>
                    <CircularProgress />
                    <p>Loading data...</p>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container spacing={10}>
            { userPosts.length === 0
                ? (
                    <Grid item sm={8} xs={12}>
                        <p>No posts from this user</p>
                    </Grid>
                )
                : (
                    <Grid item sm={8} xs={12}>
                        {userPosts.map((post) => (
                            <Post key={post.postId} post={post} />
                        ))}
                    </Grid>
                )
            }
            <Grid item sm={4} xs={12}>
                { profile === {}
                ? (<p>Loading profile...</p>)
                : (
                    <StaticProfile user={profile} />
                    )
                }
                
            </Grid>
        </Grid>
    )
}
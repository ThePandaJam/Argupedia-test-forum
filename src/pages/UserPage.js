import React, { useEffect, useState,  } from 'react'
import {useParams, useRouteMatch} from "react-router-dom";
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

//MUI imports
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';

export default function UserPage(props) {
    let {userHandle, postId} = useParams();
    //let params = useParams();
    const dispatch = useDispatch();
    //const { loading } = useSelector((state) => state.data);
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const [userPosts, setPosts] = useState([])
    const [postIdParam, setPostIdParam] = useState("")

    useEffect(() => {
        
        //get user profile info
        setLoading(true)        
        axios.get(`/user/${userHandle}`)
            .then(res => {
                setProfile(res.data.user);
                setPosts(res.data.posts);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })
        console.log(postId)
        if(postId) {
            console.log(postId)
            setPostIdParam(postId)
        }
    }, [userHandle, postId])
    

    return (
        loading 
            ? (
                <Grid container alignItems='center'>
                    <Grid item sm={12} xs={12}>
                        <CircularProgress />
                        <p>Loading data...</p>
                    </Grid>
                </Grid>
            ) 
            : (<Grid container spacing={10}>
                { userPosts.length === 0
                    ? (
                        <Grid item sm={8} xs={12}>
                            <p>No posts from this user</p>
                        </Grid>
                    )
                    : ( !postIdParam 
                            ? (
                                <Grid item sm={8} xs={12}>
                                    {userPosts.map((post) => (
                                        <Post key={post.postId} post={post} />
                                    ))}
                                </Grid>
                            ) 
                            : (
                                <Grid item sm={8} xs={12}>
                                    {userPosts.map((post) => {
                                        if(post.postId !== postIdParam){
                                            return <Post key={post.postId} post={post} />
                                        }
                                        else {
                                            return <Post key={post.postId} post={post} openDialog/>
                                        }
                                    })}
                                </Grid>
                            )
                        
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
            </Grid>)
        
    )
}
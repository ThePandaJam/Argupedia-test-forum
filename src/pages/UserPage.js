// https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/pages/user.js
import React, { useEffect, useState } from 'react'
import {useParams } from "react-router-dom";
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'


//MUI imports
import Grid from '@material-ui/core/Grid';

export default function UserPage(props) {
    let {userHandle, postId} = useParams();
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
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
    
    const userPostsMarkup = loading ? (
        <PostSkeleton/>
    ) : userPosts.length === 0 ? (
        //check that there are no posts from the user
        <p>No posts from this user</p>
    ) : !postIdParam ? (
        userPosts.map((post) => (<Post key={post.postId} post={post} />))
    ) : (
        userPosts.map((post) => {
            if(post.postId !== postIdParam){
                return <Post key={post.postId} post={post} />
            }
            else {
                return <Post key={post.postId} post={post} openDialog/>
            }
        })
    )

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {userPostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                { profile === null ? (
                <ProfileSkeleton/>
                ) : (
                <StaticProfile user={profile} />
                )}
            </Grid>
        </Grid>
    )
        
}
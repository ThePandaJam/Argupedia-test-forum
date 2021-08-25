import React, { useEffect, useState,  } from 'react'
import {useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

//MUI imports
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { connect } from 'react-redux';
import { getUserProfile } from '../redux/actions/dataActions';



function UserPage(props) {
    let {userHandle} = useParams();
    const { user, posts, loading } = props.data
    const [profile, setProfile] = useState({})
    const [userPosts, setPosts] = useState([])

    useEffect(() => {
        props.getUserProfile(userHandle)
        console.log(userHandle)
        
        axios.get(`/user/${userHandle}`)
            .then(res => {
                setProfile(res.data.user);
                setPosts(res.data.posts);
            })
            .catch(err => {
                console.log(err);
            })
        console.log(user)
        console.log(posts)
    }, [userHandle])
    
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
            { posts.length === 0
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
                { user === null
                ? (<p>Loading profile...</p>)
                : (<StaticProfile user={profile} />)
                }
                
            </Grid>
        </Grid>
    )
}

UserPage.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
})

export default connect(mapStateToProps, {getUserProfile})(UserPage)

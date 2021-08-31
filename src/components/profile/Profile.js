//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/profile/Profile.js
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'

//redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions'

//MUI
import withStyles from '@material-ui/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({
    ...theme.loginSignupStyle
  });

function Profile(props) {
    const dispatch = useDispatch();
    const {classes} = props;
    const { 
        user: { 
            credentials: { handle, createdAt, imageUrl, bio, website, location},
            loading,
            authenticated
        } 
    } = useSelector((state) => state);

    function handleImageChange(e) {
        const image = e.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        dispatch(uploadImage(formData));
    }

    function handleEditPicture(){
        const fileInput = document.getElementById('imageUpload');
        fileInput.click();
    }
    function handleLogout(){
        dispatch(logoutUser());
    }

    return (
        <Paper className={classes.paper}>
            {!loading
                ?(authenticated
                    ?(
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img className="profile-image" src={imageUrl} alt="profile"/>
                                <input 
                                    type="file" 
                                    id="imageUpload" 
                                    hidden="hidden"
                                    onChange={handleImageChange}
                                    />
                                    <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                                        <EditIcon color="primary" />
                                    </MyButton>
                            </div>
                            <hr/>
                            <div className="profile-details">
                                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                                    @{handle}
                                </MuiLink>
                                <hr/>
                                {bio && <Typography variant="body2">{bio}</Typography>}
                                <hr/>
                                {location && (
                                    <Fragment>
                                        <LocationOn color="primary"/> <span>{location}</span>
                                        <hr/>
                                    </Fragment>
                                    
                                )}
                                {website && (
                                    <Fragment>
                                        <LinkIcon color="primary"/> 
                                        <a href={website} target="_blank" rel="noopener noreferrer">
                                            {'  '}{website}
                                        </a>
                                        <hr/>
                                    </Fragment>
                                )}
                                <CalendarToday color="primary" />{' '}
                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                            </div>
                            <MyButton tip="Log out" onClick={handleLogout}>
                                <KeyboardReturn color="primary" />
                            </MyButton>
                            <EditDetails/>
                        </div>
                    )
                    :(
                        <Fragment>
                            <Typography variant="body2" align="center">
                                Experience Argupedia to its fullest potential with an account
                            </Typography>
                            <div className={classes.buttons}>
                                <Button variant="contained" color="primary" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button variant="contained" color="primary" component={Link} to="/signup">
                                    Sign up
                                </Button>
                            </div>
                        </Fragment> 
                    )
                )
                :(<ProfileSkeleton />)
            }
        </Paper>
    )
    
}

export default withStyles(styles)(Profile)
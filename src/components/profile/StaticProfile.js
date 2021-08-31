//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/profile/StaticProfile.js
import React, {Fragment} from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'

//MUI imports
import withStyles from '@material-ui/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.loginSignupStyle 
  });

function StaticProfile(props) {
    const { 
      classes,
      user: { handle, createdAt, imageUrl, bio, website, location }

     } = props;
    
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile"/>
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
            </div>
        </Paper>
    )
}

export default withStyles(styles)(StaticProfile)

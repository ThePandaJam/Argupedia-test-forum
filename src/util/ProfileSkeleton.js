import React from 'react'
import blankPic from '../images/blankProfilePic.png'

//MUI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles'

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    handle: {
        height: 20, 
        width: 60,
        backgroundColor: '#3e0aa6',
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    }
})

function ProfileSkeleton(props) {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={blankPic} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr />
                    <LocationOn color="primary" />
                    <hr />
                    <LinkIcon color="primary" />
                    <hr />
                    <CalendarToday color="primary"/>
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(ProfileSkeleton)

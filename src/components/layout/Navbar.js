// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/layout/Navbar.js
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
//import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications';
import withStyles from '@material-ui/core/styles/withStyles';
import AppIcon from '../../images/argupediaLogo.png'

//MUI
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';

//Icons
import AddIcon from "@material-ui/icons/Add"
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const styles= (theme) => ({
    ...theme.loginSignupStyle,
    navbarImage: {
        margin: '10px auto 10px 20px',
        width: '8%'
    },
    appBar: {
        backgroundColor: '#7f47ed'
    },
    siteTitle: {
        margin: '10px auto 10px auto'
    }
})
function Navbar(props) {
    const { classes } = props
    const { authenticated } = useSelector((state) => state.user);
    return (
        <AppBar className={classes.appBar}>
            <Toolbar className="nav-container">
                <img src={AppIcon} alt="Argupedia logo" className={classes.navbarImage} component={Link} to="/" />
                <Typography variant="h4" className={classes.siteTitle} color="inherit" component={Link} to="/">
                    Argupedia
                </Typography>
                {authenticated
                    ? (<Fragment>
                        <Link to="/createPost">
                            <MyButton tip="Create a post">
                                <AddIcon/>
                            </MyButton>
                        </Link>
                        
                        <Link to="/ArgupediaLearn">
                            <MyButton tip="Learn">
                                <ImportContactsIcon/>
                            </MyButton>
                        </Link>
                        <Notifications/>
                    </Fragment>)
                    : (<Fragment>
                        <Button color="inherit" component={Link} to="/ArgupediaLearn">Learn</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>)
                }

            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Navbar)
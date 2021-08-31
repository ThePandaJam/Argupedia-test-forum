// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/layout/Navbar.js
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
//import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import MyButton from '../../util/MyButton';
import Notifications from './Notifications'
//MUI
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
//Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
//import Notifications from "@material-ui/icons/Notifications"


export default function Navbar() {
    const { authenticated } = useSelector((state) => state.user);
    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated
                    ? (<Fragment>
                        <Link to="/createPost">
                            <MyButton tip="Create a post">
                                <AddIcon/>
                            </MyButton>
                        </Link>
                        
                        <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon/>
                            </MyButton>
                        </Link>
                        <Notifications/>
                    </Fragment>)
                    : (<Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>)
                }

            </Toolbar>
        </AppBar>
    )
}
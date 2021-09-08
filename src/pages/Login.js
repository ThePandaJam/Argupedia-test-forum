// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/pages/login.js
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//MUI imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = (theme) => ({...theme.loginSignupStyle})

function Login(props) {
    const { classes } = props
    const dispatch = useDispatch();
    const { UI: { uiLoading, uiErrors } } = useSelector((state) => state);
    
    const [errors, setErrors] = useState([])
    const [userEmail, setEmail] = useState("")
    const [userPassword, setPassword] = useState("")
    const history = useHistory()

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
    }, [uiErrors]);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email: userEmail,
            password: userPassword
        }
        dispatch(loginUser(userData, history))
    }
    
    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h2" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={userEmail} 
                        onChange = {(event) => onChangeHandler(event)} 
                        fullWidth />
                    <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={userPassword} 
                        onChange = {(event) => onChangeHandler(event)} 
                        fullWidth />
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={uiLoading}
                    >
                        Login
                        {uiLoading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    
                </form>
                <br/>
                <small>Don't have an account? <Link to="/signup">Sign up here</Link></small>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(Login)

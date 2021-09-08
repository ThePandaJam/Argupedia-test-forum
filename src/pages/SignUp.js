//based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/pages/signup.js
import React, { useState, useEffect } from 'react'
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
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({...theme.loginSignupStyle})

function SignUp(props) {
    const { classes } = props
    const dispatch = useDispatch();
    const { UI: { uiLoading, uiErrors } } = useSelector((state) => state);

    const [errors, setErrors] = useState([])
    const [userEmail, setEmail] = useState("")
    const [userPassword, setPassword] = useState("")
    const [userPasswordConfirm, setPasswordConfirm] = useState("")
    const [userHandle, setHandle] = useState("")
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
        } else if (name === "passwordConfirm") {
            setPasswordConfirm(value);
        } else if (name === "handle") {
            setHandle(value);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        const newUserData = {
            email: userEmail,
            password: userPassword,
            passwordConfirm: userPasswordConfirm,
            handle: userHandle
        }
        console.log("form submitted");
        dispatch(signupUser(newUserData, history));
    }
    
    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h2" className={classes.pageTitle}>
                    Sign Up
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
                    <TextField 
                        id="passwordConfirm" 
                        name="passwordConfirm" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        helperText={errors.passwordConfirm}
                        error={errors.passwordConfirm ? true : false}
                        value={userPasswordConfirm} 
                        onChange = {(event) => onChangeHandler(event)} 
                        fullWidth />
                    <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle" 
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={userHandle} 
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
                        Sign up
                        {uiLoading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    
                </form>
                <br/>
                <small>Already have an account? <Link to="/login">Log in here</Link></small>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(SignUp)

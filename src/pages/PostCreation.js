// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/PostScream.js
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppIcon from '../images/argupediaLogo.png'

//MUI imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getSchemes } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    }
})

function PostCreation(props) {
    const { classes } = props
    const dispatch = useDispatch();
    const { UI: { uiLoading, uiErrors } } = useSelector((state) => state);
    const [errors, setErrors] = useState([])
    //change to set title
    const [title, setTitle] = useState("")
    // add scheme + setter
    const [scheme, setScheme] = useState("")
    // add scheme form based on the chosen scheme (similar to update user data)
    const history = useHistory()

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
        dispatch(getSchemes());
    }, [uiErrors]);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "title") {
          setTitle(value);
        } else if (name === "scheme") {
            setScheme(value);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        const postData = {
            title: title,
            scheme: scheme
        }
        dispatch(createPost(postData, history))
    }
    
    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={AppIcon} alt="Argupedia logo" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                    Create a post
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                        id="title" 
                        name="title" 
                        type="text" 
                        label="Debate topic" 
                        multiline
                        rows="3"
                        placeholder="An interesting debate topic"
                        helperText={errors.title}
                        error={errors.title ? true : false}
                        className={classes.textField}
                        value={title} 
                        onChange = {(event) => onChangeHandler(event)} 
                        fullWidth />
                    <TextField 
                        id="scheme" 
                        name="scheme" 
                        type="text" 
                        label="Argument scheme" 
                        placeholder="Chosen argument scheme"
                        helperText={errors.scheme}
                        error={errors.scheme ? true : false}
                        className={classes.textField}
                        value={scheme} 
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
                        className={classes.submitButton}
                        disabled={uiLoading}
                    >
                        Start a debate
                        {uiLoading && (
                            <CircularProgress size={30} className={classes.progressSpinner}/>
                        )}
                    </Button>
                    
                </form>
                <br/>
                <small><Link to="/">Back to homepage</Link></small>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(PostCreation)
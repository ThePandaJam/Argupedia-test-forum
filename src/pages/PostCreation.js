import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import AppIcon from '../images/argupediaLogo.png'

//MUI imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/dataActions';


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
    const { classes, UI: { loading, uiErrors } } = props
    const [errors, setErrors] = useState([])
    //change to set title
    const [body, setBody] = useState("")
    // add scheme + setter
    // add scheme form based on the chosen scheme (similar to update user data)
    const history = useHistory()

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
    }, [uiErrors]);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "body") {
          setBody(value);
        }
      }

    function handleSubmit(e) {
        e.preventDefault();
        const postData = {
            body: body
        }
        console.log("form submitted");
        props.createPost(postData, history)
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
                        id="body" 
                        name="body" 
                        type="text" 
                        label="Post title" 
                        multiline
                        rows="3"
                        placeholder="An interesting debate topic"
                        helperText={errors.body}
                        error={errors.body ? true : false}
                        className={classes.textField}
                        value={body} 
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
                        disabled={loading}
                    >
                        Start a debate
                        {loading && (
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
PostCreation.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {createPost})(withStyles(styles)(PostCreation))
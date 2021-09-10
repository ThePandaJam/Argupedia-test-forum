import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//MUI imports 
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/actions/dataActions'; 

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    createPostForm: {
        textAlign: 'center',
        padding: 25
      },
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    }
})

function NewPostForm(props) {
    const { classes, 
        chosenScheme: {
            schemeId,
            name,
            majorPremise,
            minorPremise,
            conclusion
        } 
    } = props
    const dispatch = useDispatch();
    const { uiLoading, uiErrors } = useSelector((state) => state.UI);
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
            scheme: name
        }
        dispatch(createPost(postData, history))
    }

    return (
        <div>
                <form noValidate onSubmit={handleSubmit} autoComplete="off">
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
                    {/* {schemeId ? (
                        <Typography variant="body1">Select a scheme from the list to begin</Typography>
                        ) : ( */}
                        <FormControl 
                            disabled 
                            fullWidth 
                            className={classes.textField}

                        > 
                            <InputLabel htmlFor="component-disabled">Argument scheme</InputLabel>
                            <Input id="component-disabled" value={name ? name : ''}/>
                            <FormHelperText error={name ? false : true}>Select a scheme from the list</FormHelperText>

                        </FormControl>
                         {/* )
                        } */}
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
           
            
        </div>
    )
}

export default withStyles(styles)(NewPostForm)

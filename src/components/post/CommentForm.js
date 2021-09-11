// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/CommentForm.js
import React, { Fragment, useState, useEffect } from 'react'

//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


//redux imports
import { useDispatch, useSelector } from 'react-redux';

import { getSchemeInfo, submmitComment } from '../../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    
})

function CommentForm(props) {
    const dispatch = useDispatch()
    const { classes } = props
    const {  uiLoading, uiErrors } = useSelector((state) => state.UI);
    const { authenticated } = useSelector((state) => state.user);
    const { postId, schemeId, loading } = useSelector((state) => state.data.post);
    const { schemeInfo } = useSelector((state) => state.data);

    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
    }, [uiErrors]);
    
    useEffect(() => {
        dispatch(getSchemeInfo(schemeId));
    }, [dispatch, schemeId]);
    
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "body") {
          setBody(value);
        }
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        const commentData = {
            body: body
        }
        dispatch(submmitComment(postId, commentData))
        setBody("")
    }

    return (
        <Fragment>
            {authenticated 
                ? ( 
                    loading ? (
                        <Grid item sm={12} style={{textAlign:'center'}}>
                            <CircularProgress size={30}/>
                            <Typography variant="h4">Loading scheme data...</Typography>
                        </Grid>
                    ) : (
                        <Grid item sm={12} style={{alignContent:'center'}}>
                        {schemeInfo.criticalQuestions.map((question) => (
                                <Typography key={question.questionNo} variant="body1">{question.questionBody}</Typography>
                            ))}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Add an argument"
                                error={errors.comment ? true : false}
                                helperText={errors.body}
                                value={body} 
                                onChange = {(event) => onChangeHandler(event)} 
                                fullWidth
                                className={classes.textField} />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.submitButton}
                                disabled={uiLoading}
                            >
                                Create argument
                            </Button>
                        </form>
                        <hr className={classes.visibleSeparator}/>
                    </Grid>
                    )
                ) : (
                    null
                )
            }
        </Fragment>
    )
}

export default withStyles(styles)(CommentForm)
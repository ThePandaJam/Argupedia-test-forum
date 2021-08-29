import React, { Fragment, useState, useEffect } from 'react'

//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//redux imports
import { useDispatch, useSelector } from 'react-redux';

import { submmitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    
})

function CommentForm(props) {
    const dispatch = useDispatch()
    const { classes } = props
    const {  loading, uiErrors } = useSelector((state) => state.UI);
    const { authenticated } = useSelector((state) => state.user);
    const { postId } = useSelector((state) => state.data.post);

    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")

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
                    <Grid item sm={12} style={{textAlign:'center'}}>
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
                                disabled={loading}
                            >
                                Create argument
                            </Button>
                        </form>
                        <hr className={classes.visibleSeparator}/>
                    </Grid>
                )
                : (
                    null
                )
            }
        </Fragment>
    )
}

export default withStyles(styles)(CommentForm)
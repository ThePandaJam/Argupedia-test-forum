import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';

//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//redux imports
import { connect } from 'react-redux';
import { submmitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    
})

function CommentForm(props) {
    const { classes, authenticated, UI: { loading, uiErrors } } = props
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
        console.log("form submitted");
        props.submmitComment(props.postId, commentData)
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

CommentForm.propTypes = {
    submmitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    UI: state.UI
})

export default connect(mapStateToProps, {submmitComment})(withStyles(styles)(CommentForm))
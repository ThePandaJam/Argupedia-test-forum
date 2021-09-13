// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/CommentForm.js
import React, { Fragment, useState, useEffect, useCallback } from 'react'

//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//redux imports
import { useDispatch, useSelector } from 'react-redux';

import { getSchemeInfo, submmitComment } from '../../redux/actions/dataActions';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    criticalQuestionDropdown: {
        width: '100%',
        margin: '10px auto 10px auto'
    },
    dropdownItem: {
        whiteSpace: 'unset',
        wordBreak: 'normal'
    }
})

function CommentForm(props) {
    const dispatch = useDispatch()
    const { classes, schemeId } = props
    const {  uiLoading, uiErrors } = useSelector((state) => state.UI);
    const { authenticated } = useSelector((state) => state.user);
    const { postId } = useSelector((state) => state.data.post);
    const { schemeInfo, loading } = useSelector((state) => state.data)
    
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")
    const [critQuestion, setCritQuestion] = useState("")
    const [questionId, setQuestionId] = useState(0)

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
    }, [uiErrors]);
    
    useEffect(() => {
        if(schemeId){
            dispatch(getSchemeInfo(schemeId));
        }
    }, []);
    
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "body") {
          setBody(value);
        }
      }

    const dropdownHandler = (event) => {
        setCritQuestion(event.target.value)
        setBody(event.target.value)
    }
    
      function handleSubmit(e) {
        e.preventDefault();
        const commentData = {
            schemeId: schemeInfo.schemeId,
            questionNo: questionId,
            body: body
        }
        dispatch(submmitComment(postId, commentData))
        setQuestionId(0)
        setCritQuestion("")
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
                        
                        <form onSubmit={handleSubmit}>
                            <FormControl className={classes.criticalQuestionDropdown}>
                                <InputLabel>Critical Question</InputLabel>
                                <Select
                                name="critQuestion"
                                id="demo-simple-select"
                                value={critQuestion}
                                onChange={dropdownHandler} 
                                >
                                    <MenuItem value="" onClick={() => setQuestionId(0)}>
                                        <em>None</em>
                                    </MenuItem>
                                {schemeInfo && schemeInfo.criticalQuestions.map((question) => (
                                    <MenuItem 
                                        className={classes.dropdownItem} 
                                        key={question.questionNo} 
                                        value={question.questionBody}
                                        //name={question.questionNo}
                                        onClick={() => setQuestionId(question.questionNo)}
                                        >
                                            CQ{question.questionNo}: {question.questionBody}
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText error={questionId === 0 ? true : false}>Select a Critical Question</FormHelperText>
                            </FormControl>
                            <TextField
                                name="body"
                                type="text"
                                label="Add an argument"
                                error={errors.comment ? true : false}
                                helperText={errors.comment}
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
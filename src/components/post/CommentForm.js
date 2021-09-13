// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/CommentForm.js
import React, { Fragment, useState, useEffect } from 'react'

//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


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
    const { classes, postSchemeId } = props
    const {  uiLoading, uiErrors } = useSelector((state) => state.UI);
    const { authenticated } = useSelector((state) => state.user);
    const { postId } = useSelector((state) => state.data.post);
    const { 
        schemeInfo : {
            schemeId,
            premisesAndConclusion: {
                minorPremise,
                majorPremise,
                conclusion
            },
            criticalQuestions
        }, 
        loading 
    } = useSelector((state) => state.data)
    
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState("")
    const [responseType, setResponseType] = useState("undercut")
    //for undercuts
    const [critQuestion, setCritQuestion] = useState("")
    const [questionId, setQuestionId] = useState(0)
    //for rebuttals
    const [majPremise, setMajPremise] = useState('')
    const [minPremise, setMinPremise] = useState('')
    const [conc, setConc] = useState('')

    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
    }, [uiErrors]);
    
    useEffect(() => {
        if(postSchemeId){
            dispatch(getSchemeInfo(postSchemeId));
        }
    }, []);

    useEffect(() => {
        if(majorPremise,
            minorPremise,
            conclusion) {
            mapSchemeDetailsToState(majorPremise,
                minorPremise,
                conclusion)
        }
    }, [majorPremise, minorPremise, conclusion]);

    function mapSchemeDetailsToState(
        majorPremise,
        minorPremise,
        conclusion) {
        if(majorPremise){
            setMajPremise(majorPremise)
        } else {
            setMajPremise('')
        }

        if(minorPremise){
            setMinPremise(minorPremise)
        } else {
            setMinPremise('')
        }

        if(conclusion){
            setConc(conclusion)
        } else {
            setConc('')
        }
    }

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "body") {
          setBody(value);
        }else if (name === "majPremise") {
            setMajPremise(value);
        }
        else if (name === "minPremise") {
            setMinPremise(value);
        }
        else if (name === "conc") {
            setConc(value);
        }
      }

    const dropdownHandler = (event) => {
        setCritQuestion(event.target.value)
        setBody(event.target.value)
    }

    const radioHandler = (event) => {
        setResponseType(event.target.value)
    }
    
      function handleSubmit(e) {
        e.preventDefault();
        if (responseType === "undercut") {
            const commentData = {
                schemeId: schemeId,
                questionNo: questionId,
                body: body
            }
            dispatch(submmitComment(postId, commentData))
        }
        if (responseType === "rebuttal") {
            let compoundBody = "Major Premise: " + majPremise 
                + "\n Minor Premise : " + minPremise + "\n Conclusion: " + conc
            const commentData = {
                schemeId: schemeId,
                questionNo: questionId,
                body: compoundBody
            }
            dispatch(submmitComment(postId, commentData))
        }
        //dispatch(submmitComment(postId, commentData))
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
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Type of response</FormLabel>
                                    <RadioGroup row aria-label="response-type" name="responseType" value={responseType} onChange={radioHandler}>
                                        <FormControlLabel value="undercut" control={<Radio />} label="Undercut" />
                                        <FormControlLabel value="rebuttal" control={<Radio />} label="Rebuttal" />
                                    </RadioGroup>
                                </FormControl>
                                { responseType === "undercut" ? (
                                    <>
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
                                        {criticalQuestions && criticalQuestions.map((question) => (
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
                                    </>
                                ) : ( 
                                    <>
                                    <FormControl
                                        fullWidth
                                        className={classes.textField}
                                    >
                                        <InputLabel htmlFor="component-simple">Major Premise</InputLabel>
                                        <Input 
                                            id="majorPremise"
                                            name="majPremise"
                                            multiline
                                            rows="4" 
                                            value={majPremise} 
                                            onChange={onChangeHandler} 
                                        />
                                        <FormHelperText error={errors.title ? false : true}>{errors.title}</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        className={classes.textField}
                                    >
                                        <InputLabel htmlFor="component-simple">Minor Premise</InputLabel>
                                        <Input 
                                            id="minorPremise"
                                            name="minPremise"
                                            multiline
                                            rows="4" 
                                            value={minPremise} 
                                            onChange={onChangeHandler} 
                                        />
                                        <FormHelperText error={errors.title ? false : true}>{errors.title}</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        className={classes.textField}
                                    >
                                        <InputLabel htmlFor="component-simple">Conclusion</InputLabel>
                                        <Input 
                                            id="conclusion"
                                            name="conc"
                                            multiline
                                            rows="4" 
                                            value={conc} 
                                            onChange={onChangeHandler} 
                                        />
                                        <FormHelperText error={errors.title ? false : true}>{errors.title}</FormHelperText>
                                    </FormControl>
                                    </>
                                )}
                                
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
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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
    //title
    const [title, setTitle] = useState("")
    //major and minor premises and conclusion
    const [majPremise, setMajPremise] = useState('')
    const [minPremise, setMinPremise] = useState('')
    const [conc, setConc] = useState('')

    const history = useHistory()
    
    useEffect(() => {
        if(uiErrors) {
            setErrors(uiErrors)
        }
        if(majorPremise,
            minorPremise,
            conclusion) {
            mapSchemeDetailsToState(majorPremise,
                minorPremise,
                conclusion)
        }
    }, [uiErrors, majorPremise,
        minorPremise,
        conclusion]);

    function mapSchemeDetailsToState(majorPremise,
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
        if (name === "title") {
          setTitle(value);
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
      

    function handleSubmit(e) {
        e.preventDefault();
        const postData = {
            title: title,
            scheme: name,
            majorPremise: majPremise,
            minorPremise: minPremise,
            conclusion: conc
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
                    <FormControl 
                        disabled 
                        fullWidth 
                        className={classes.textField}
                    > 
                        <InputLabel htmlFor="component-disabled">Argument scheme</InputLabel>
                        <Input id="scheme" value={name ? name : ''}/>
                        <FormHelperText error={name ? false : true}>Select a scheme from the list</FormHelperText>
                    </FormControl>
                    <Typography variant="h5" className={classes.pageTitle}>
                        Add your first argument
                    </Typography>
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

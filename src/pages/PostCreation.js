// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/PostScream.js
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//MUI imports 
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getSchemes } from '../redux/actions/dataActions';
import NewPostForm from '../components/post/NewPostForm';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    spinnerDiv: {
        position: 'relative',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 50
    },
    schemeSelector: {
        backgroundColor: '#7f47ed',
        color: '#fff',
        width: '100%',
        alignItems: 'flex-start'
    },
    tabs: {
        marginTop: 20,
        width: '100%',
    },
    createPostForm: {
        textAlign: 'center',
        padding: 25
    },
})

function PostCreation(props) {
    const { classes } = props
    const dispatch = useDispatch();
    const { loading, schemes } = useSelector((state) => state.data)
    const [value, setValue] = useState(0);
    const [chosenScheme, setChosenScheme] = useState({})

    useEffect(() => {
        dispatch(getSchemes());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setChosenScheme(schemes[newValue])
      };

    return (
        <Fragment>
            {loading 
                ? (
                    <div className={classes.spinnerDiv}>
                        <CircularProgress size={200} thickness={2}/>
                        <Typography variant="h4">Loading schemes...</Typography>
                    </div>
                ) : (
                    <Grid container spacing={4}>
                        <Grid item sm={4} xs={12} className={classes.schemeSelector}>
                        <Tabs
                            orientation="vertical"
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="Scheme selection"
                            className={classes.tabs}
                        >
                            {schemes.map((scheme) => (
                                <Tab key={scheme.schemeId} label={scheme.name}/>
                            ))}
                        </Tabs>
                        
                        </Grid>
                        <Grid item sm={8} xs={12} className={classes.createPostForm}>
                            <Typography variant="h4" className={classes.pageTitle}>
                                Create a debate topic
                            </Typography>
                            <NewPostForm chosenScheme={chosenScheme}/>
                            <br/>
                            <small><Link to="/">Back to homepage</Link></small>
                        </Grid>
                    </Grid>
                )
            }
        </Fragment> 
    )
}

export default withStyles(styles)(PostCreation)
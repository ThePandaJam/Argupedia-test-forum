// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/PostScream.js
//https://material-ui.com/components/tabs/

import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//MUI imports 
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    spinnerDiv: {
        position: 'relative',
        textAlign: 'center',
        marginTop: 70,
        marginBottom: 50
    },
    tabSelector: {
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Fragment>
                {children}
            </Fragment>
        )}
      </div>
    );
  }

function ArgupediaLearn(props) {
    const { classes } = props
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item sm={4} xs={12} className={classes.tabSelector}>
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Tab selection"
                    className={classes.tabs}
                >
                    <Tab label="Schemes and Critical Questions"/>
                    <Tab label="Argument Graphs and Labelling"/>
                </Tabs>
                
                </Grid>
                <Grid item sm={8} xs={12} className={classes.createPostForm}>
                    <TabPanel value={value} index={0}>
                        <Typography variant="h4" className={classes.pageTitle}>
                            Schemes and Critical Questions
                        </Typography>
                        <hr className={classes.visibleSeparator}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography variant="h4" className={classes.pageTitle}>
                            Argument graphs and Labelling
                        </Typography>
                        <hr className={classes.visibleSeparator}/>
                    </TabPanel>
                </Grid>
            </Grid>
        </Fragment> 
    )
}

export default withStyles(styles)(ArgupediaLearn)
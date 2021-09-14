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
import { Card, CardContent, Paper } from '@material-ui/core';

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
        textAlign: 'left',
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
            <Tabs
                //orientation="vertical"
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Tab selection"
                className={classes.tabSelector}
            >
                <Tab label="Schemes and Critical Questions"/>
                <Tab label="Argument Graphs and Labelling"/>
            </Tabs>

            <TabPanel value={value} index={0}>
                <Typography variant="h4" className={classes.pageTitle}>
                    Schemes and Critical Questions
                </Typography>
                <hr className={classes.visibleSeparator}/>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are Schemes?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are Critical Questions?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How can I start a debate?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How do I construct an argument?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How do I respond to an argument?
                        </Typography>
                    </CardContent>
                </Card>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h4" className={classes.pageTitle}>
                    Argument graphs and Labelling
                </Typography>
                <hr className={classes.visibleSeparator}/>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are Argument graphs?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are the different types of labels?
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How are labels calculated?
                        </Typography>
                    </CardContent>
                </Card>
            </TabPanel>
        </Fragment> 
    )
}

export default withStyles(styles)(ArgupediaLearn)
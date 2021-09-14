// based on https://github.com/hidjou/classsed-react-firebase-client/blob/master/src/components/scream/PostScream.js
//https://material-ui.com/components/tabs/

import React, { Fragment, useState } from 'react'

//MUI imports 
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


//image imports
import postCreationPageImage from '../images/learningMaterials/PostCreationPage.PNG'
import ReplyToComment from '../images/learningMaterials/ReplyToComment.PNG'
import ReplyFormUnfilled from '../images/learningMaterials/ReplyFormUnfilled.PNG'
import ReplyFormFilled from '../images/learningMaterials/ReplyFormFilled.PNG'
import ReplyFormRebuttal from '../images/learningMaterials/ReplyFormRebuttal.PNG'

import BilateralAttackLabellings from '../images/learningMaterials/BilateralAttackLabellings.PNG'
import BilateralLabellingByScore from '../images/learningMaterials/BilateralLabellingByScore.PNG'
import UnilateralLabellingByScore from '../images/learningMaterials/UnilateralLabellingByScore.PNG'
import UnilateralLabellingReversed from '../images/learningMaterials/UnilateralLabellingReversed.PNG'
import RatingAnArgument from '../images/learningMaterials/RatingAnArgument.PNG'




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
    function backToTop(){
        window.scrollTo(0, 0)
    }

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
                        <Typography variant="body1">
                            Schemes are a way to formulate an argument as a set of premises and a conclusion.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are Critical Questions?
                        </Typography>
                        <Typography variant="body1">
                            Each scheme has its own set of critical questions, 
                            which can be used to challenge an argument.
                            <br/><br/>
                            In Argupedia you can ask critical questions and offer your own response 
                            or shift the Burden of Proof onto your opponent.
                            <br/><br/>
                            Critical questions allow users to interact within the debate by shifting this burden 
                            back and forth until a conclusion is accepted by the majority of parties involved
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How can I start a debate?
                        </Typography>
                        <Typography variant="body1">
                            You need to be logged in to create a debate topic.
                            <br/><br/>
                            Navigate to the post creation page using the + button on the top right of the screen.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={postCreationPageImage}
                        title="Post Creation Page"
                        />
                        <Typography variant="body1">
                            Introduce your debate topic and select a scheme from the list. The premises and conclusion will be populated automatically.
                            <br/><br/>
                            You will need to edit the premises and conclusion text to suit your starting argument.
                            Click the "Start a debate" button when you're finished. 
                            You will be redirected to the homepage and your post will be on the top of the list.
                            <br/><br/>
                            Click the "Open full post" button to view the full debate page. Check if you have any responses!
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How do I construct an argument?
                        </Typography>
                        <Typography variant="body1">
                            Argupedia helps you to stay on topic by limiting what kind of responses you can give.
                            All you need to do is fill in the Major Premise, Minor Premise and Conclusion fields
                            if you are constructing a new argument or a rebuttal to an existing argument.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How do I respond to an argument?
                        </Typography>
                        <Typography variant="body1">
                            You need to be logged in to respond to an argument.
                            <br/><br/>
                            On the post page you can respond to the original argument by clicking on the Reply button.
                            You can also respond to other arguments by clicking the Reply button on the bottom right 
                            of the argument you want to respond to.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={ReplyToComment}
                        title="Reply to comment"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            You can either make an undercut argument by asking a critical question and challenging
                            one of the premises or a conclusion or you can make a rebuttal by constructing a new argument
                            with a set of premises and an opposing conclusion to the argument you're responding to.
                            <br/><br/>
                        </Typography>
                        <Typography variant="body1">
                            Choose your type of argument using the radio buttons in the response form.
                            <br/><br/>
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={ReplyFormUnfilled}
                        title="Reply form"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            If you picked Undercut, select the critical question you want to ask. You can adapt it in the field below.
                            If you have a response to the critical question, you can add it to the last field, or leave it empty,
                            so your opponent can answer.
                            <br/><br/>
                            If you are answering a critical question, select the question that you're responding to and copy in the
                            text. Use the last field for your response.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={ReplyFormFilled}
                        title="Reply with an undercut"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            If you picked Rebuttal, edit the text in the Major Premise, Minor Premise and Conclusion fields
                            to suit your argument.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={ReplyFormRebuttal}
                        title="Reply with a rebuttal"
                        />
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={backToTop} 
                        >
                            Back to Top
                        </Button>
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
                        <Typography variant="body1">
                            Argument graphs are a visual representation of how conclusions are drawn from formalised arguments.
                            In other words, they show how the arguments in a debate are related to each other and how we can use
                            those relationships to find out which arguments are winning, which are losing and which are neither 
                            winning nor losing.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            What are the different types of labels?
                        </Typography>
                        <Typography variant="body1">
                            Argupedia uses three types of labels:
                            <br/><br/>
                            <b>IN:</b> an argument that is IN can be considered to be "winning".
                            This kind of argument only has attackers that are labelled OUT.
                            An argument is automatically IN if it has no attackers (since no attackers are labelled OUT)
                            <br/><br/>
                            <b>OUT:</b> an argument that is OUT can be considered to be "losing". Such an argument has 
                            at least one attacker that is labelled IN.
                            <br/><br/>
                            <b>UNDEC:</b> an argument that is UNDEC can be considered to be "undecided". Such an argument 
                            has an attacker labelled OUT or UNDEC, but <b>no</b> attackers that are labelled IN
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            How are labels calculated?
                        </Typography>
                        <Typography variant="body1">
                            Argupedia uses a labelling algorithm for <b>preferred semantics</b>.
                            <br/><br/>
                            This means that the algorigm accept a legal labelling that maximises
                            the number of arguments that are labelled IN (which also minimises UNDEC arguments)
                            <br/><br/>
                            Rebuttals create a bilateral (two-sided) attack, which have three legal labelling options
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={BilateralAttackLabellings}
                        title="Bilateral attack labelling options"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            The algorithm will decide which type of labelling to settle on once enough users 
                            have voted on arguments in the debate. 
                            The argument with a higher score will be given the IN labelling
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={BilateralLabellingByScore}
                        title="Bilateral labelling decided by score"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            Undercuts create a unilateral (one-sided) attack, which means the attacker has to be labelled IN 
                            (if legal to do so) and the attaked argument becomes OUT.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={UnilateralLabellingByScore}
                        title="Unilateral labelling"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            If the attacked argument earns a higher score over time, the algorithm will re-evaluate the attack
                            and may reverse it.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={UnilateralLabellingReversed}
                        title="Unilateral labelling reversed by score"
                        />
                        <Typography variant="body1">
                            <br/><br/>
                            The fate of the debate depends on you, so get voting! Use the thumbs up and thumbs down buttons to 
                            rate each argument.
                        </Typography>
                        <CardMedia
                        component="img"
                        className={classes.media}
                        image={RatingAnArgument}
                        title="An upvoted argument"
                        />
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={backToTop} 
                        >
                            Back to Top
                        </Button>
                    </CardContent>
                </Card>
            </TabPanel>
        </Fragment> 
    )
}

export default withStyles(styles)(ArgupediaLearn)
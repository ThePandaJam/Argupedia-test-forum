import React, {Fragment, useState, useEffect } from 'react'
import MyButton from '../../util/MyButton';
//MUI
import withStyles from '@material-ui/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

//icons
import EditIcon from '@material-ui/icons/Edit';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.loginSignupStyle,
    button: {
        float: 'right'
    }
})


function EditDetails(props) {
    const dispatch = useDispatch()
    const {classes} = props
    const { credentials } = useSelector((state) => state.user);

    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);

    function mapUserDetailsToState(credentials) {
        if(credentials.bio){
            setBio(credentials.bio)
        } else {
            setBio('')
        }

        if(credentials.website){
            setWebsite(credentials.website)
        } else {
            setWebsite('')
        }

        if(credentials.location){
            setLocation(credentials.location)
        } else {
            setLocation('')
        }
    }
    
    function handleOpen(){
            setOpen(true)
            mapUserDetailsToState(credentials)
    }

    function handleClose(){
        setOpen(false)
    }

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "bio") {
            setBio(value);
        } else if (name === "website") {
            setWebsite(value);
        }
        else if (name === "location") {
            setLocation(value);
          }
      }
    
    function handleSubmit(e) {
        e.preventDefault();
        const userDetails = {
            bio: bio,
            website: website,
            location: location
        }
        console.log("details updated");
        dispatch(editUserDetails(userDetails));
        handleClose();
    }

    useEffect(() => {
        mapUserDetailsToState(credentials)
    }, [credentials])

    return (
        <Fragment>
            <MyButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
                <EditIcon color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Update your details
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField 
                            name="bio" 
                            type="text" 
                            label="Bio" 
                            multiline 
                            rows="3" 
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={bio}
                            onChange={onChangeHandler}
                            fullWidth
                            />
                            <TextField 
                            name="website" 
                            type="text" 
                            label="Website" 
                            placeholder="Your personal/professional website"
                            className={classes.textField}
                            value={website}
                            onChange={onChangeHandler}
                            fullWidth
                            />
                            <TextField 
                            name="location" 
                            type="text" 
                            label="Location" 
                            placeholder="Where you are now"
                            className={classes.textField}
                            value={location}
                            onChange={onChangeHandler}
                            fullWidth
                            />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(EditDetails);
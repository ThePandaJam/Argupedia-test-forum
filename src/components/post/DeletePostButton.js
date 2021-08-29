import React, { Fragment, useState } from 'react'
import MyButton from '../../util/MyButton';
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
//icons
import DeleteOutline from "@material-ui/icons/DeleteOutline"
//redux
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        right: '0',
        marginRight: '20px',
        top:'15px',
        position: 'absolute'
    }
}

function DeletePostButton(props) {
    const dispatch = useDispatch();
    const { classes } = props
    const { postId } = useSelector((state) => state.data.post);
    const [open, setOpen] = useState(false);
    function handleOpen(){
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
    }
    function deleteThisPost(){
        dispatch(deletePost(postId))
        setOpen(false)
    }
    return (
        <Fragment>
            <MyButton tip="Delete post" onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color="secondary"/>
            </MyButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this post?
                    </DialogTitle>
                    <DialogContent>
                        This action is not reversible
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deleteThisPost} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(DeletePostButton)
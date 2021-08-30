import React, { useEffect, useState, Fragment }from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton';

//MUI imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChatIcon from '@material-ui/icons/Chat'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';


//Redux
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions'; 


export default function Notifications(props) {
    const dispatch = useDispatch()
    const { notifications } = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null)
    dayjs.extend(relativeTime)

    function handleOpen(event){
        setAnchorEl(event.target)
    }
    function handleClose(){
        let unreadNotificationIds = notifications
            .filter(notif => !notif.read)
            .map(notif => notif.notificationId);
        dispatch(markNotificationsRead(unreadNotificationIds))
        setAnchorEl(null)
    }

    let notificationsIcon
    //check that there are notifications associated with the user
    if (notifications && notifications.length > 0) {
        //check that there are unread notifications
        notifications.filter(notif => notif.read === false).length > 0
        ? ( notificationsIcon = (
            <Badge 
                badgeContent={notifications.filter(notif => notif.read === false).length}
                color="secondary">
                    <NotificationsIcon />
                </Badge>
        ))
        : ( notificationsIcon = <NotificationsIcon/>)
    } else {
        notificationsIcon = <NotificationsIcon/>
    }

    let notificationsMarkup = 
        notifications && notifications.length > 0 ?(
            notifications.map(notif => {
                const verb = notif.type === 'argument' ? 'added an argument to your topic' : 'rated';
                const time = dayjs(notif.createdAt).fromNow();
                const iconColor = notif.read ? 'primary' : 'secondary';
                const icon = notif.type === 'argument' ? (
                    <ChatIcon color={iconColor} stype={{marginRight: 10}} />
                ) : (
                    <ThumbsUpDownIcon color={iconColor} stype={{marginRight: 10}} />
                )
            
            return (
                <MenuItem key={notif.createdAt} onClick={handleClose}>
                    {icon}
                    <Typography
                        component={Link}
                        color="inherit"
                        variant="body1"
                        to={`/users/${notif.recipient}/post/${notif.postId}`}
                        >
                            {notif.sender} {verb} {time}
                        </Typography>
                </MenuItem>
            )
            })
        ) : (
            <MenuItem onClick={handleClose}>
                You have no notifications yet
            </MenuItem>
        )

    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}>
                        {notificationsIcon}
                    </IconButton>
            </Tooltip>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                   {notificationsMarkup} 
                </Menu>
        </Fragment>
    )
}

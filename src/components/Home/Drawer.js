import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

export default function Draw(props) {
    const { logout, open, handleDrawerClose,panelSelector } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key="Presupuestos" onClick={() => panelSelector('budget')}>
                    <ListItemIcon> <PostAddIcon /> </ListItemIcon>
                    <ListItemText primary="Presupuestos" />
                </ListItem>
                <ListItem button key="Histórico" onClick={() => panelSelector('budget-history')}>
                    <ListItemIcon> <PlaylistAddCheckIcon /> </ListItemIcon>
                    <ListItemText primary="Histórico" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="Salir" onClick={() => logout()}>
                    <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                    <ListItemText primary="Salir" />
                </ListItem>
            </List>
        </Drawer>
    )
}
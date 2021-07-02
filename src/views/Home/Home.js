import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useQuery } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "../../components/Home/AppBar";
import Drawer from "../../components/Home/Drawer";
import Budget from "../Budget";
import BudgetHistory from "../BudgetHistory";
import useAuth from "../../hooks/useAuth";
import { GET_TMPBUDGET } from "../../gql/budget";
import User from "../User";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function Home() {
    const { logout } = useAuth();
    const classes = useStyles();
    const [panelSelected, setPanelSelected] = useState(null);
    const [open, setOpen] = React.useState(true);
    const { data, loading } = useQuery(GET_TMPBUDGET);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classSelec = () => (clsx(classes.content, {
        [classes.contentShift]: open,
    }));

    const panelSelector = (selected) => {
        switch (selected) {
            case 'budget':
                if (loading) return null;
                else {
                    const { getTmpbudget } = data;
                    setPanelSelected(<Budget getTmpbudget={getTmpbudget} />);
                    setOpen(false);
                }
                break
            case 'budget-history':
                setPanelSelected(<BudgetHistory />);
                setOpen(false);
                break;
            case 'user':
                setPanelSelected(<User />);
                setOpen(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setPanelSelected(<User />);
    },[]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                logout={logout}
                open={open}
                handleDrawerClose={handleDrawerClose}
                panelSelector={panelSelector}
            />

            <main className={classSelec()}>
                <div className={classes.drawerHeader} />
                {panelSelected}
            </main>
        </div>
    );
}

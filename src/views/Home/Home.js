import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "../../components/Home/AppBar";
import Drawer from "../../components/Home/Drawer";
import Budget from "../../components/Budget/Budget";
import BudgetHistory from "../../components/BudgetHistory";
import useAuth from "../../hooks/useAuth";
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
    const [open, setOpen] = React.useState(false);

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
                setPanelSelected(<Budget />);
                break
            case 'budget-history':
                setPanelSelected(<BudgetHistory />);
                break;
            default:
                break;
        }
    }

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

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../../components/Home/AppBar";
import Drawer from "../../components/Home/Drawer";
import Budget from "../Budget";
import BudgetHistory from "../BudgetHistory";
import useAuth from "../../hooks/useAuth";
import { GET_TMPBUDGET } from "../../gql/budget";
import User from "../User";
import { TmpBudget } from "../../components/Budget/interfaces";
import type { PanelAction } from "../../components/Home/interfaces";
import type { AuthContextValue } from "./interfaces";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Home(): React.ReactElement {
  const { logout } = useAuth() as unknown as AuthContextValue;
  const classes = useStyles();
  const [panelSelected, setPanelSelected] = useState<React.ReactNode | null>(
    null
  );
  const [open, setOpen] = useState(true);
  const { data, loading } = useQuery(GET_TMPBUDGET);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const classSelec = (): string =>
    clsx(classes.content, {
      [classes.contentShift]: open,
    });

  const panelSelector = (selected: PanelAction): void => {
    switch (selected) {
      case "budget":
        if (loading) return;
        const getTmpbudget: TmpBudget[] = data?.getTmpbudget ?? [];
        setPanelSelected(<Budget getTmpbudget={getTmpbudget} />);
        setOpen(false);
        break;
      case "budget-history":
        setPanelSelected(<BudgetHistory />);
        setOpen(false);
        break;
      case "user":
        setPanelSelected(<User />);
        setOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setPanelSelected(<User />);
  }, []);

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

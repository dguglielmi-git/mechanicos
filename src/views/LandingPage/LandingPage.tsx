import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./LandingPage.scss";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function LandingPage(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className="landing-page">
      <AppBar position="static" elevation={0} className="landing-page__appbar">
        <Toolbar className="landing-page__toolbar">
          <Typography variant="h6" className={classes.title}>
            MechanicOS
          </Typography>

          <Button color="inherit" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


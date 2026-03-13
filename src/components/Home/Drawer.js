import React, { useState, useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PeopleIcon from "@material-ui/icons/People";
import BuildIcon from "@material-ui/icons/Build";

import { MENU_ITEMS } from "../../config/menuConfig";

const ICON_MAP = {
  PostAdd: PostAddIcon,
  ExitToApp: ExitToAppIcon,
  PlaylistAddCheck: PlaylistAddCheckIcon,
  Receipt: ReceiptIcon,
  People: PeopleIcon,
  Build: BuildIcon,
};

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
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Draw(props) {
  const { logout, open, handleDrawerClose, panelSelector } = props;
  const classes = useStyles();
  const theme = useTheme();

  const getInitialOpenState = useCallback(() => {
    return MENU_ITEMS.reduce((acc, item) => {
      if (item.children && item.defaultOpen) {
        acc[item.id] = true;
      }
      return acc;
    }, {});
  }, []);

  const [openMenus, setOpenMenus] = useState(getInitialOpenState);

  const handleMenuAction = useCallback(
    (action) => {
      if (action === "logout") {
        logout();
      } else {
        panelSelector(action);
      }
    },
    [logout, panelSelector]
  );

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item) => {
    const IconComponent = ICON_MAP[item.icon];
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.id];

    if (hasChildren) {
      return (
        <React.Fragment key={item.id}>
          <ListItem button onClick={() => toggleMenu(item.id)}>
            <ListItemIcon>
              {IconComponent && <IconComponent />}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => renderMenuItem(child))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem
        key={item.id}
        button
        className={item.level > 0 ? classes.nested : undefined}
        onClick={() => item.action && handleMenuAction(item.action)}
      >
        <ListItemIcon>
          {IconComponent && <IconComponent />}
        </ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    );
  };

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
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {MENU_ITEMS.map((item) => (
          <React.Fragment key={item.id}>
            {item.dividerBefore && <Divider />}
            {renderMenuItem(item)}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

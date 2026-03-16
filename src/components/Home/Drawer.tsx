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
import TrackChangesIcon from "@material-ui/icons/TrackChanges";

import { MENU_ITEMS } from "../../config/menuConfig";
import {
  DrawerProps,
  IconKey,
  MenuItem,
  MenuItemChild,
  PanelAction,
} from "./interfaces";

const ICON_MAP: Record<IconKey, React.ComponentType> = {
  PostAdd: PostAddIcon,
  ExitToApp: ExitToAppIcon,
  PlaylistAddCheck: PlaylistAddCheckIcon,
  Receipt: ReceiptIcon,
  People: PeopleIcon,
  Build: BuildIcon,
  TrackChanges: TrackChangesIcon,
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

export default function Draw({
  logout,
  open,
  handleDrawerClose,
  panelSelector,
}: DrawerProps): React.ReactElement {
  const classes = useStyles();
  const theme = useTheme();

  const getInitialOpenState = useCallback((): Record<number, boolean> => {
    return MENU_ITEMS.reduce<Record<number, boolean>>((acc, item) => {
      if (item.children && item.defaultOpen) {
        acc[item.id] = true;
      }
      return acc;
    }, {});
  }, []);

  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>(
    getInitialOpenState
  );

  const handleMenuAction = useCallback(
    (action: string): void => {
      if (action === "logout") {
        logout();
      } else {
        panelSelector(action as PanelAction);
      }
    },
    [logout, panelSelector]
  );

  const toggleMenu = (id: number): void => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: MenuItem | MenuItemChild): React.ReactNode => {
    const IconComponent = item.icon
      ? ICON_MAP[item.icon as IconKey]
      : undefined;
    const hasChildren =
      "children" in item && item.children && item.children.length > 0;
    const isOpen = openMenus[item.id];

    if (hasChildren && "children" in item) {
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
              {item.children!.map((child) => renderMenuItem(child))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem
        key={item.id}
        button
        className={"level" in item && item.level > 0 ? classes.nested : undefined}
        onClick={() =>
          "action" in item && item.action && handleMenuAction(item.action)
        }
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

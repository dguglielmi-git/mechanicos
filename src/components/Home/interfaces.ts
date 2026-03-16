export interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export interface MenuItemChild {
  id: number;
  label: string;
  icon?: string;
  level: number;
  action?: string;
}

export interface MenuItem {
  id: number;
  label: string;
  icon?: string;
  level: number;
  defaultOpen?: boolean;
  children?: MenuItemChild[];
  action?: string;
  dividerBefore?: boolean;
}

export type PanelAction =
  | "client-create"
  | "client-list"
  | "budget"
  | "budget-history"
  | "work-create"
  | "work-tracking"
  | "user";

export interface DrawerProps {
  logout: () => void;
  open: boolean;
  handleDrawerClose: () => void;
  panelSelector: (action: PanelAction) => void;
}

export type IconKey =
  | "PostAdd"
  | "ExitToApp"
  | "PlaylistAddCheck"
  | "Receipt"
  | "People"
  | "Build"
  | "TrackChanges";

export const MENU_ITEMS = [
  {
    id: 1,
    label: "Clientes",
    icon: "People",
    level: 0,
  },
  {
    id: 2,
    label: "Presupuestos",
    icon: "Receipt",
    level: 0,
    defaultOpen: true,
    children: [
      {
        id: 3,
        label: "Nuevo",
        icon: "PostAdd",
        level: 1,
        action: "budget",
      },
      {
        id: 4,
        label: "Histórico",
        icon: "PlaylistAddCheck",
        level: 1,
        action: "budget-history",
      },
    ],
  },
  {
    id: 5,
    label: "Trabajos",
    icon: "Build",
    level: 0,
    defaultOpen: false,
    children: [
      {
        id: 6,
        label: "Nuevo",
        icon: "PostAdd",
        level: 1,
      },
      {
        id: 7,
        label: "Histórico",
        icon: "PlaylistAddCheck",
        level: 1,
      },
    ],
  },
  {
    id: 8,
    label: "Salir",
    icon: "ExitToApp",
    level: 0,
    action: "logout",
    dividerBefore: true,
  },
];

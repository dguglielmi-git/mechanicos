import LayoutBasic from "../layouts/LayoutBasic";
import LayoutFree from "../layouts/LayoutFree";
import Home from "../views/Home";
import User from "../views/User";
import Error404 from "../views/Error404";

const routes = [
    {
        path: "/",
        layout: LayoutFree,
        component: Home,
        exact: true,
    },
    {
        path: "/home",
        layout: LayoutBasic,
        component: Home,
        exact: true,
    },
    {
        path: "/user",
        layout: LayoutBasic,
        component: User,
        exact: true,
    },
    {
        layout: LayoutBasic,
        component: Error404,
    },
];

export default routes;

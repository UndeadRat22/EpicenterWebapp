// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Maps from "views/Maps/Maps.jsx";
import FindsView from "../views/Finds/FindsView";
import MissingModelView from "../views/MissingModels/MissingModelView";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Epicenter Home",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/findings",
    sidebarName: "Findings",
    navbarName: "Findings",
    icon: "history",
    component: FindsView
  },
  {
    path: "/subjects",
    sidebarName: "Subjects",
    navbarName: "Subjects",
    icon: "portrait",
    component: MissingModelView
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

export default dashboardRoutes;

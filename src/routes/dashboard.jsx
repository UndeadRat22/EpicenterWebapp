// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import PeopleTableList from "views/TableList/PeopleTableList.jsx";
import CarTableList from "views/TableList/CarTableList.jsx";
import Maps from "views/Maps/Maps.jsx";
import Accessibility from "@material-ui/icons/Accessibility";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Epicenter Home",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/cartable",
    sidebarName: "Found Cars",
    navbarName: "Found Cars",
    icon: "directions_car",
    component: CarTableList
  },
  {
    path: "/peopletable",
    sidebarName: "Found People",
    navbarName: "Found People",
    icon: Accessibility,
    component: PeopleTableList
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;

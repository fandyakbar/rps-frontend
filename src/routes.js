/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import CPMK from "rps/cpmk";

import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Assessment from "rps/assessment";
import DetailAssessment from "rps/assessment/detailAssessment";

// Komponen Dari fandy
import Rubrik from "rps/rubrik";

// @mui icons
import Icon from "@mui/material/Icon";
import ShowRubrik from "rps/rubrik/showRubrik";
import DetailRPS from "layouts/dashboard/detailRPS";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShowAssessment from "rps/assessment/showAssessment";
import ShowCPMK from "rps/cpmk/showCPMK";
import ShowRubrikDashboard from "rps/dashboard";
import RubrikAssessment from "rps/assessment/rubrikAssessment";
import ShowRubrikAssessment from "rps/assessment/showRubrikAssessment";
import ShowCPMKAssessment from "rps/assessment/showCPMKAssessment";
import Task from "rps/taks";
import ShowTask from "rps/taks/showTask";
import EditTask from "rps/taks/editTask";
import PDF from "rps/dashboard/pdf";

const routes = [
  {
    type: "dashboard",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Profile />,
  },

  {
    type: "collapse",
    name: "Assessment Penilaian",
    key: "assessment",
    icon: <Icon fontSize="small">calculate</Icon>,
    route: "/assessment",
    component: <Assessment />,
  },
  {
    type: "collapse",
    name: "Tugas",
    key: "task",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/task",
    component: <Task />,
  },

  {
    type: "collapse",
    name: "Rubrik",
    key: "rubrik",
    icon: <Icon fontSize="small">vertical_split</Icon>,
    route: "/rubrik",
    component: <Rubrik />,
  },

  {
    type: "Login",
    name: "Log In",
    key: "signin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },

  {
    type: "anak",
    name: "assessment_detail",
    key: "assessment",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/assessment_detail/:id",
    component: <DetailAssessment />,
  },

  {
    type: "lamandetailrubrik",
    name: "rubrik_detail",
    key: "rubrik_detail",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/rubrik_detail/:id",
    component: <ShowRubrik />,
  },

  {
    type: "lamandetaildashboard",
    name: "dashboard_detail",
    key: "dashboard_detail",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/dashboard/:id",
    component: <ShowRubrikDashboard />,
  },

  {
    type: "lamandetailrps",
    name: "myrps",
    key: "myrps",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/myrps/:id",
    component: <DetailRPS />,
  },

  {
    type: "lamaneditAssessment",
    name: "lamaneditAssessment",
    key: "lamaneditAssessment",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/assessment/show/:id",
    component: <ShowAssessment />,
  },

  {
    type: "lamaneditCPMK",
    name: "lamaneditCPMK",
    key: "cpmk",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/cpmk/show/:id",
    component: <ShowCPMK />,
  },

  {
    type: "rubrikAssessment",
    name: "rubrikAssessment",
    key: "rubrikAssessment",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/rubrikAssessment/:id",
    component: <RubrikAssessment />,
  },

  {
    type: "rubrikAssessmentShow",
    name: "rubrikAssessmentShow",
    key: "rubrikAssessmentShow",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/rubrikAssessment/show/:id",
    component: <ShowRubrikAssessment />,
  },

  {
    type: "rubrikCPMKAssessmentShow",
    name: "rubrikCPMKAssessmentShow",
    key: "rubrikCPMKAssessmentShow",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/rubrikAssessment/cpmk/:id",
    component: <ShowCPMKAssessment />,
  },

  {
    type: "showTask",
    name: "showTask",
    key: "showTask",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/task/:id",
    component: <ShowTask />,
  },

  {
    type: "editTask",
    name: "editTask",
    key: "editTask",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/task/show/:id",
    component: <EditTask />,
  },
  {
    type: "pdf",
    name: "pdf",
    key: "pdf",
    icon: <Icon fontSize="small">Haha</Icon>,
    route: "/pdf/:id",
    component: <PDF />,
  },
];

export default routes;

// {
//   type: "collapse",
//   name: "CPMK",
//   key: "cpmk",
//   icon: <Icon fontSize="small">bookmarks</Icon>,
//   route: "/cpmk",
//   component: <Tables />,
// },

// {
//   type: "lamandetail",
//   name: "cpmk_detail",
//   key: "cpmk",
//   icon: <Icon fontSize="small">Haha</Icon>,
//   route: "/cpmk_detail/:id",
//   component: <CPMK />,
// },

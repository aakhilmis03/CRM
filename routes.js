const staffRoutes = require("./src/modules/staff/routes/staffRoutes");
const staffDashboardRoutes = require("./src/modules/staffDashboard/routes/staffDashboardRoutes");
const router= require("./src/modules/buisness_info/routes/router");
const filterRouter=require("./src/modules/requirement/router/filterRouter");
module.exports = [
  {
    path: "/api/staff",
    handler: staffRoutes,
  },
  {
    path: "/api/staff",
    handler: staffDashboardRoutes,
  },
  {
    path:"/api/",
    handler:router,
  },
  {
    path:"/api/",
    handler:filterRouter,
  }
];

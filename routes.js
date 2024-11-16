const staffRoutes = require("./src/modules/staff/routes/staffRoutes");
const staffDashboardRoutes = require("./src/modules/staffDashboard/routes/staffDashboardRoutes");
const router= require("./src/modules/buisness_info/routes/router");
const filterRouter=require("./src/modules/requirement/router/filterRouter");
const leadRoutes = require("./src/modules/lead/routes/router");
const requirement = require("./src/modules/requirement/router/filterRouter");
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
    handler:leadRoutes,
  },
  {
    path: "/api", // Add this line to include the business info router
    handler: router,
  },
  {
    path:"/api",
    handler:requirement
  }
];

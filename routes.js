const staffRoutes = require("./src/modules/staff/routes/staffRoutes");
const staffDashboardRoutes = require("./src/modules/staffDashboard/routes/staffDashboardRoutes");
const router= require("./src/modules/buisness_info/routes/router");
const leadRoutes = require("./src/modules/lead/routes/router");
const requirement = require("./src/modules/requirement/router/filterRouter");
const leadsearch = require("./src/modules/allSaleslead/routes/allsalesleadroute");
const addtaskcategory = require("./src/modules/task/category/routes/category.route")
const subCategory= require("./src/modules/task/subcategory/routes/subcategory.route");
const manageTaskRoutes = require("./src/modules/task/manageTask/routes/manageTask.router");
const metricsRoutes = require("./src/modules/metrics/routes/metrics.route")
const leadDetailsRoutes = require("./src/modules/userContact/routes/leadDetailsRoutes");
const callbackmeeting=require("./src/modules/call/callback/routes/callback.routes");
const meetingRoutes = require("./src/modules/call/meeting/routes/meeting.route");
const postUpdateRoutes=require("./src/modules/call/post&update/routes/post.update.route")

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
  },
  {
    path:"/api",
    handler:leadsearch
  },
  {
    path:"/api/category",
    handler:addtaskcategory
  },
  {
    path:"/api/subcategories",
    handler:subCategory
  },
  {
    path:"/api/manageTask",
    handler:manageTaskRoutes
  },
  {
    path: "/api/metrics",
    handler: metricsRoutes,
  },
  {
    path:"/api/client",
    handler: leadDetailsRoutes,
  },
  {
    path:"/api/callback",
    handler: callbackmeeting 
  },
  {
    path: "/api/calls/meeting",
    handler: meetingRoutes,
  },
  {
    path:"/api/postUpdate",
    handler: postUpdateRoutes,
  }
];

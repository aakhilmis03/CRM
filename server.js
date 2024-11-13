const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const staffRoutes = require('./src/modules/staff/routes/staffRoutes');
// const staffDashboardRoutes = require('./src/modules/staffDashboard/routes/staffDashboardRoutes');
const routes = require('./routes');

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Body parser for incoming requests
app.use(express.urlencoded({extended: true}))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
// app.use('/api/staff', staffRoutes);
// app.use('/api/staff', staffDashboardRoutes);  // Protected dashboard routes
routes.map(route => {
  app.use(route.path, route.handler);
})

// Server start
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

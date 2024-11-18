const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
// const subcategoryRoutes= require("./src/modules/task/subcategory/routes/subcategory.route")

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Body parser for incoming requests
app.use(express.urlencoded({extended: true}))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
mongoose.set('debug', true)

routes.map(route => {
  app.use(route.path, route.handler);
})
// app.use(express.json());
// app.use('/api/subcategories', subcategoryRoutes);
// Server start
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

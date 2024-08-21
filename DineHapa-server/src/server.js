const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config');
const cors = require('cors');
const app = express();



mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
app.use(express.json());

app.use(cors());

const orderRoutes = require('../routes/orderRoutes'); 
// Use the order routes
app.use('/orders',orderRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

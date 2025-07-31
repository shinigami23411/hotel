const express = require('express');
const app = express();
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');
const db = require('./utils/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use(express.static(__dirname));

console.log('hotelRoutes:', hotelRoutes);
console.log('bookingRoutes:', bookingRoutes);

db.connect().then(() => {
  app.listen(3000, () => {
    console.log('server listening on port 3000');
  });
});
const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    guestName: String,
    arrivalDate: Date,
    departureDate: Date
});
module.exports = mongoose.model('Booking', bookingSchema);

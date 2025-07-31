const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('hotel');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'error fetching bookings' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: 'error creating bookings' });
    }
};
const Hotel = require('../models/Hotel');

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: 'error fetching hotels' });
    }
};

exports.createHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: 'error creating hotels' });
    }
};
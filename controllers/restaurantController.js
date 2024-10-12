const Restaurant = require('../models/restaurant');

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// other methods: getRestaurantById, updateRestaurant, deleteRestaurant

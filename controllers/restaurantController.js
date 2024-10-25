const Restaurant = require('../models/restaurant');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const { name, location, description, coverimage } = req.body;
        const newRestaurant = await Restaurant.create({ name, location, description, coverimage });
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
    try {
        const { name, location, description, coverimage } = req.body;
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        restaurant.name = name;
        restaurant.location = location;
        restaurant.description = description;
        restaurant.coverimage = coverimage;

        await restaurant.save();
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        await restaurant.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Image = require('../models/image');
const Restaurant = require('../models/restaurant');

exports.createImage = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        const image = await Image.create({
            ...req.body,
            restaurantId: req.params.restaurantId
        });
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRestaurantImages = async (req, res) => {
    try {
        const images = await Image.findAll({ where: { restaurantId: req.params.restaurantId } });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// other methods: getImageById, updateImage, deleteImage

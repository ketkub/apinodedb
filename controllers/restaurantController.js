const Restaurant = require('../models/restaurants'); // ตรวจสอบว่าเส้นทางนี้ถูกต้อง

// สร้างร้านอาหารใหม่
exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ดึงข้อมูลร้านอาหารทั้งหมด
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ดึงข้อมูลร้านอาหารตาม ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// อัปเดตร้านอาหารตาม ID
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        await restaurant.update(req.body);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ลบร้านอาหารตาม ID
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        await restaurant.destroy();
        res.status(204).send(); // ส่งคืนสถานะ 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

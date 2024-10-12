const Image = require('../models/image'); // เปลี่ยนให้ตรงกับโมเดลที่คุณสร้างขึ้น

// สร้างภาพใหม่
exports.createImage = async (req, res) => {
    try {
        const { restaurantId } = req.params; // รับ restaurantId จาก params
        const newImage = await Image.create({
            ...req.body,
            restaurantId // บันทึก restaurantId ในภาพ
        });
        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ดึงภาพทั้งหมดของร้านอาหาร
exports.getRestaurantImages = async (req, res) => {
    try {
        const { restaurantId } = req.params; // รับ restaurantId จาก params
        const images = await Image.findAll({ where: { restaurantId } });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ดึงภาพตาม ID
exports.getImageById = async (req, res) => {
    try {
        const { id } = req.params; // รับ imageId จาก params
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// อัพเดทภาพตาม ID
exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params; // รับ imageId จาก params
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        await image.update(req.body);
        res.json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ลบภาพตาม ID
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params; // รับ imageId จาก params
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        await image.destroy();
        res.status(204).send(); // ลบแล้วไม่ส่งข้อมูลกลับ
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

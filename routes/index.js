const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const restaurantController = require('../controllers/restaurantController');
const imageController = require('../controllers/imageController');

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัปโหลด
const upload_path = path.join(__dirname, '../public/profile_images');
if (!fs.existsSync(upload_path)) {
  fs.mkdirSync(upload_path, { recursive: true });
}
// ตั้งค่า multer สำหรับจัดการไฟล์อัปโหลด
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

// User routes
router.post('/users', upload.single('profile_image'), userController.createUser);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', upload.single('profile_image'), userController.updateUser); // ใช้ multer สำหรับอัปโหลด
router.delete('/users/:id', userController.deleteUser);

// Post routes
router.post('/users/:userId/posts', postController.createPost);
router.get('/users/:userId/posts', postController.getUserPosts);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Restaurant routes
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.post('/restaurants', restaurantController.createRestaurant);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// Image routes
router.post('/restaurants/:restaurantId/images', imageController.createImage);
router.get('/restaurants/:restaurantId/images', imageController.getRestaurantImages);
router.get('/images/:id', imageController.getImageById); // แก้ไขให้มีความชัดเจน
router.put('/images/:id', imageController.updateImage);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;

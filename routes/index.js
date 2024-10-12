const express = require('express');
const app = express();

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const restaurantController = require('./controllers/restaurantController');
const imageController = require('./controllers/imageController');

app.use(express.json());

// User routes
app.post('/api/users', userController.createUser);           // สร้างผู้ใช้ใหม่
app.get('/api/users', userController.getUsers);               // แสดงผู้ใช้ทั้งหมด
app.get('/api/users/:id', userController.getUserById);       // ค้นหาผู้ใช้ตาม ID
app.put('/api/users/:id', userController.updateUser);         // แก้ไขข้อมูลผู้ใช้
app.delete('/api/users/:id', userController.deleteUser);      // ลบผู้ใช้
app.post('/api/login', userController.login);                  // เข้าสู่ระบบ

// Post routes
app.post('/api/users/:userId/posts', postController.createPost);           // สร้างโพสต์ใหม่
app.get('/api/users/:userId/posts', postController.getUserPosts);         // ดึงโพสต์ทั้งหมดของผู้ใช้
app.get('/api/posts', postController.getPosts);                            // แสดงโพสต์ทั้งหมด
app.get('/api/posts/:id', postController.getPostById);                    // ค้นหาโพสต์ตาม ID
app.put('/api/posts/:id', postController.updatePost);                      // แก้ไขโพสต์
app.delete('/api/posts/:id', postController.deletePost);                   // ลบโพสต์

// Restaurant routes
app.post('/api/restaurants', restaurantController.createRestaurant);          // สร้างร้านอาหารใหม่
app.get('/api/restaurants', restaurantController.getRestaurants);             // แสดงร้านอาหารทั้งหมด
app.get('/api/restaurants/:id', restaurantController.getRestaurantById);     // ค้นหาร้านอาหารตาม ID
app.put('/api/restaurants/:id', restaurantController.updateRestaurant);       // แก้ไขข้อมูลร้านอาหาร
app.delete('/api/restaurants/:id', restaurantController.deleteRestaurant);    // ลบร้านอาหาร

// Image routes (เชื่อมกับ restaurants)
app.post('/api/restaurants/:restaurantId/images', imageController.createImage);     // สร้างภาพใหม่สำหรับร้านอาหาร
app.get('/api/restaurants/:restaurantId/images', imageController.getRestaurantImages); // ดึงภาพทั้งหมดของร้านอาหาร
app.get('/api/images/:id', imageController.getImageById);                            // ค้นหาภาพตาม ID
app.put('/api/images/:id', imageController.updateImage);                              // แก้ไขภาพ
app.delete('/api/images/:id', imageController.deleteImage);                           // ลบภาพ

// เปิดให้บริการ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

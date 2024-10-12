const express = require('express');
const sequelize = require('./config/db');

// นำเข้า Controllers
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const restaurantController = require('./controllers/restaurantController');
const imageController = require('./controllers/imageController');

const app = express();
app.use(express.json());

// รวมเส้นทางทั้งหมดที่นี่
// User routes
app.post('/api/users', userController.createUser);
app.get('/api/users', userController.getUsers);
app.get('/api/users/:id', userController.getUserById);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);
app.post('/api/login', userController.login);

// Post routes
app.post('/api/users/:userId/posts', postController.createPost);
app.get('/api/users/:userId/posts', postController.getUserPosts);
app.get('/api/posts', postController.getPosts);
app.get('/api/posts/:id', postController.getPostById);
app.put('/api/posts/:id', postController.updatePost);
app.delete('/api/posts/:id', postController.deletePost);

// Restaurant routes
app.post('/api/restaurants', restaurantController.createRestaurant);
app.get('/api/restaurants', restaurantController.getRestaurants);
app.get('/api/restaurants/:id', restaurantController.getRestaurantById);
app.put('/api/restaurants/:id', restaurantController.updateRestaurant);
app.delete('/api/restaurants/:id', restaurantController.deleteRestaurant);

// Image routes
app.post('/api/restaurants/:restaurantId/images', imageController.createImage);
app.get('/api/restaurants/:restaurantId/images', imageController.getRestaurantImages);
app.get('/api/images/:id', imageController.getImageById);
app.put('/api/images/:id', imageController.updateImage);
app.delete('/api/images/:id', imageController.deleteImage);

// เปิดให้บริการ
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => console.error(error));

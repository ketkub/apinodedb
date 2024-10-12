const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const restaurantController = require('../controllers/restaurantController'); // แก้เป็น '../controllers/restaurantController'
const imageController = require('../controllers/imageController'); // แก้เป็น '../controllers/imageController'

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Post routes
router.post('/users/:userId/posts', postController.createPost);
router.get('/users/:userId/posts', postController.getUserPosts);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Restaurant routes
router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

// Image routes (เชื่อมกับ restaurants)
router.post('/restaurants/:restaurantId/images', imageController.createImage);
router.get('/restaurants/:restaurantId/images', imageController.getRestaurantImages);
router.get('/images/:id', imageController.getImageById);
router.put('/images/:id', imageController.updateImage);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;

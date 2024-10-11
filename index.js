const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(express.json());

// ใช้ router ต่าง ๆ โดยเพิ่มเส้นทางเฉพาะเจาะจง
app.use('/api/users', userRoutes);           // สำหรับ user-related routes
app.use('/api/posts', postRoutes);           // สำหรับ post-related routes
app.use('/api/restaurants', restaurantRoutes); // สำหรับ restaurant-related routes
app.use('/api/images', imageRoutes);         // สำหรับ image-related routes

// เปิดให้บริการ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

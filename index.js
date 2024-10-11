const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(express.json());

// ใช้ router ต่าง ๆ
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', imageRoutes);

// เปิดให้บริการ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

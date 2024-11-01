const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/index');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors());
// ระบุตำแหน่ง URL สำหรับเรียกดูรูปภาพ
app.use(express.static('public'));
app.use('/images', express.static('public/images'));

// ระบุตำแหน่ง URL สำหรับเรียกใช้งาน API
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// ใช้ alter: true เพื่ออัปเดตตารางโดยไม่ลบข้อมูลเดิม
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Database connection error:', error);
});

// คำแนะนำ: ควรพิจารณาเพิ่ม middleware สำหรับจัดการข้อผิดพลาด
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

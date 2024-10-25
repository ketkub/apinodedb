const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// สร้างผู้ใช้ใหม่
exports.createUser = async (req, res) => {
  try {
    // เข้ารหัสรหัสผ่านด้วย bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// แสดงผู้ใช้ทั้งหมด
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ค้นหาผู้ใช้ตาม ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// แก้ไขข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบผู้ใช้
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login ด้วย email และ password
exports.login = async (req, res) => {
  try {
    // ค้นหาผู้ใช้ด้วย email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: 'email หรือ password ไม่ถูกต้อง' });
    }

    // ตรวจสอบรหัสผ่านด้วย bcrypt
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: 'email หรือ password ไม่ถูกต้อง' });
    }

    // สร้าง JWT token
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

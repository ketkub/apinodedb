const bcrypt = require('bcrypt');
const User = require('../models/User');

// สร้างผู้ใช้ใหม่
exports.createUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // ตรวจสอบข้อมูลซ้ำ
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
          username,
          email,
          password,
          image: req.file ? req.file.filename : null // บันทึกรูปภาพ
      });
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
      const { username, email } = req.body;
      const image = req.file ? req.file.filename : null; // รับชื่อไฟล์รูปภาพ

      const user = await User.findByPk(req.params.id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      await user.update({
          username,
          email,
          image: image || user.image // ใช้รูปภาพเดิมหากไม่มีการอัปโหลดใหม่
      });

      res.json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// login ด้วย email และ password
exports.login = async (req, res) => {
    try {
    const user = await User.findOne(
    {
    where: { email: req.body.email, password: req.body.password }
    });
    if (!user) {
    return res.status(404).json({ message: 'email หรือ password ไม่ถูกต้อง' });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
    };

const router = require('express').Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
    const admin = await Admin.findOne({ email });
    if(!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await admin.matchPassword(password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const { getProfile, updateProfile, getPublicProfiles, getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/profiles/public', authMiddleware, getPublicProfiles);
router.get('/profile/:id', authMiddleware, getUserProfile);
router.get('/admin/profile/:id', authMiddleware, adminOnly, getUserProfile);

module.exports = router;

const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// Get profile details
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Update profile details
exports.updateProfile = async (req, res) => {
    const { name, bio, phone, photo, isPublic } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.profile.bio = bio || user.profile.bio;
        user.profile.phone = phone || user.profile.phone;
        user.profile.photo = photo || user.profile.photo;
        user.profile.isPublic = isPublic !== undefined ? isPublic : user.profile.isPublic;

        await user.save();
        res.json({ message: 'Profile updated' });
    } catch (err) {
        errorHandler(res, err);
    }
};

// Get public profiles
exports.getPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ 'profile.isPublic': true }).select('-password');
        res.json(users);
    } catch (err) {
        errorHandler(res, err);
    }
};

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.profile.isPublic && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(user);
    } catch (err) {
        errorHandler(res, err);
    }
};

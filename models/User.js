const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profile: {
        photo: String,
        bio: String,
        phone: String,
        isPublic: { type: Boolean, default: true },
    },
    provider: { type: String, enum: ['local', 'google', 'facebook', 'twitter', 'github'], default: 'local' }
});
module.exports = mongoose.model('User', UserSchema);

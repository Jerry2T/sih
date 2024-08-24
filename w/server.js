// server.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/plantguard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ProfileSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const Profile = mongoose.model('Profile', ProfileSchema);

// Handle profile form submission with MongoDB
app.post('/update-profile', (req, res) => {
    const { username, email, password } = req.body;
    const profile = new Profile({ username, email, password });
    profile.save()
        .then(() => res.json({ message: 'Profile updated successfully!' }))
        .catch(err => res.status(500).json({ message: 'Error saving profile', error: err }));
});

const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Simple input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login existing users
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // In your login route handler
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.status(200).json({
            message: 'User logged in successfully',
            user: req.session.user
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user 
exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error logging out user:', err);
                res.status(500).json({ message: 'Server error' });
            } else {
                res.status(200).json({ message: 'User logged out successfully' });
            }
        });
    } else {
        res.status(200).json({ message: 'User not logged in' });
    }
}

// Get user profile
exports.getProfile = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(400).json({ message: 'Error getting profile.', error });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile.', error });
    }
};

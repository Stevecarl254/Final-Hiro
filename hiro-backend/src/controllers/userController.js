import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";

// Helper/temporary function for email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const registerUser = async (req, res) => {
    try {
	const {name, email, password, phoneNumber } = req.body;

	const existing = await User.findOne({ email });

	// validate input fields
	if(!name) return res.status(400).json({ error: 'Name is required' });
	if(!email) return res.status(400).json({ error: 'Email is required' });
	if(!password) return res.status(400).json({ error: 'Password is required' });
	if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });
	// validate email format
	if (!isValidEmail(email)) return res.status(400).json({ error: 'Inavalid email format' });
	// Validate phone number (optional regex for format)
	if (!/^\d+$/.test(phoneNumber)) return res.status(400).json({ error: 'Invalid phone number format' });

	if (password.length < 8) {
	return res.status(400).json ({ error: 'Password must be at least 8 characters long' });
	}
	// Check for existing users
	const existingUser = await User.findOne({ email });
	if (existingUser) return res.status(400).json({ error: 'Email already in use' });

	const user = new User({ name, email, password, phoneNumber });
	await user.save();
	res.status(201).json({ message: 'User profile registered successfully' });
    } catch (error) {
	res.status(500).json({ message: 'server error', error: error.message });
    }
};
export const loginUser = async(req, res) => {
    try {
	const { email, password } = req.body;
	if (!email || !password) {
	    return res.status(500).json({ message: 'email and password are required'});
	}

	//Find user in the database
	const user = await User.findOne({ email });
	if (!user) {
	    return res.status(404).json({ message: 'User not found' });
	}
	// validate password
	const isValidPassword = await user.comparePassword(password);
	if (!isValidPassword) {
	    return res.status(401).json({ message: 'Invalid credentials' });
	}
	// Generate JWT token
	const token = generateToken(user._id, user.role);

	res.status(200).json({
	    message: 'Login successful',
	    token,
	    user: {
		id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
	    },
	});
    } catch (error) {
	// handle server errors
	res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const logoutUser = (req, res) => {
    try {
	// Clear the token in the HTTP-only cookies
	res.clearCookie( 'token' ); // clear the cookie that stores the toke
	res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
	res.status(500).json({ message: 'Server error', error: error.message });
    }
};

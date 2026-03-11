import User from './../models/User.js';
import generateToken from '../jwt/jwttoken.js';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const role="user";

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Default role to "user" if not provided or if it's an empty string
        const userRole = role || "user";

        const user = new User({ 
            email, 
            password, 
            role: userRole, 
            username 
        });

        await user.save();

        res.status(201).json({ 
            success: true, 
            message: "User registered successfully" 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);
        
        // Remove password from the user object before sending it back for security
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            user: userResponse, 
            token: token 
        });
    } catch (error) {
        console.error("Login failed:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { register, login };
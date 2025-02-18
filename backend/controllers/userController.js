import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Function to create a JWT token
const createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET);
}

// Ensure Admin Exists (Predefined Credentials)
const ensureAdminExists = async () => {
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123"; // Strong predefined password

    const existingAdmin = await userModel.findOne({ email: adminEmail, isAdmin: true });

    if (!existingAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const adminUser = new userModel({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true
        });

        await adminUser.save();
        console.log("Admin account created successfully.");
    }
};

// Call function to ensure admin exists
ensureAdminExists();

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, isAdmin: user.isAdmin });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
            
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, isAdmin: user.isAdmin });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

export { loginUser, registerUser };

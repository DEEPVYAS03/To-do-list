const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try{
        console.log(req.body);
        const {name, email, password} = req.body;
        
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(202).json({ status:"failure",message: "User with this email already exists , Try with different email or Login" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ status:"success",message: "User created successfully" });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ status:"failure", message: "Server Error" });
    }
}



const login = async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.findOne({ email : req.body.email });
        if (!user) {
            return res.status(202).send({ status: "failure", message: 'Invalid credentials' })
        }


        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        
        if (!isPasswordCorrect) {
            return res.status(202).send({ status: "failure", message: 'Invalid credentials' })
        }

        // JWT token

        const jwtsecret = process.env.JWT_SECRET;
        const token = jwt.sign({ email: user.email, userId: user._id }, jwtsecret , { expiresIn: '24h' });

        res.status(200).json({ success: true, token: token, userId: user._id }); 

    }
    catch(err){
        console.error(err);
        res.status(500).json({ status:"failure", message: "Server Error" });
    }
}

module.exports = {
    signup,
    login
}
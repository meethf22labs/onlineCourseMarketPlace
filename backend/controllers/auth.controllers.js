const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


const registerUser = async(req, res) => {
    console.log("Creating user with data:", req.body);
    const {name, email, password, role} = req.body;
    try {
        // check if user exists
        const existingUser = await User.findOne({where: {email: email}});
        if (existingUser){
            res.status(400).send({message: "User already exists!!"})
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role 
        })

        // generate token
        const token = await generateToken(newUser);

        return res.status(201).send({
            message: "user created successfully",
            user: newUser,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}


const loginUser = async(req, res) => {
    console.log("Logging in user with data:", req.body);
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email: email}});
        if (!user){
            res.status(400).send({message: "Invalid credentials or no user found"});
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            res.status(400).send({message: "Password Incorrect"})
        }

        // generate token
        const token = await generateToken(user);

        return res.status(200).send({
            message: "user logged in successfully",
            user: user,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", error: error.message });
    }
}

module.exports = {registerUser, loginUser};
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
// register logic
exports.registerController = async (req,res)=>
    {
        console.log("Inside Register function");
        const {username,password,email} = req.body
        console.log(username,password,email);
        try {
            // check email is in mongodb users
            const existingUser = await users.findOne({email})
            if(existingUser)
                {
                    // already user
                    res.status(406).json("Account already exist! Please login")
                }
                else{
                    // add / register user : create object for your model
                    const newUser = new users({
                        username,email,password,github:"",linkedin:"",profilePic:""
                    })
                    // update mongodb from model using the method save()
                    await newUser.save()
                    res.status(200).json(newUser)
                }
        } catch (error) {
            res.status(401).json(error)
        }


    }

// login
exports.loginController = async (req,res) =>
    {
        console.log("inside Login");
        const {email,password} = req.body
        console.log(email,password);
        try {
            const existingUser = await users.findOne({email,password})
            if(existingUser)
                {
                    // token generate
                    const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                    res.status(200).json({
                        user:existingUser,
                        token
                    })
                }else{
                    res.status(404).json("Invalid Email / Password..")
                }
        } catch (error) {
            res.status(401).json(err)
            
        }
    }
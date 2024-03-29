const express = require ('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const jwt = require ('jsonwebtoken')


//Register check if exists/ creates user account
router.post('/register', async(req, res) =>{
 try{
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
     return res.status(200)
               .send({message:"User already exists", success: false})
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res.status(200)
       .send({message:"user created successfully",success :true})
 }catch (error){
    res.status(500)
       .send({message:"Error creating user", success:false, error})
 }
});


//Login
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200)
                      .send({message:"User does not exist",success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200)
                      .send({message:"Password is incorrect", success: false}); 
                    
                 
        }else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
              expiresIn: "1d",
            })
            res.status(200)
               .send({message:"Login successful", success: true, data: token});
        }
    }catch (error){
        res.status(500)
           .send({message:"Error login in", success: false, error})
    }
});


router.post('/get-id', authMiddleware, async(req, res)=>{
    try{
        const user = await User.findOne({_id: req.body.userId})

        if(!user){
            return res
            .status(200)
            .send({ message:"User does not exist", success: false})

        }else{
            res.status(200).send({
                success: true, data:{
                    
                    name: user.name,
                    email: user.email,
                    role: user.role,
                                     
                },
            })
        }

    } catch (error){
        res.status(500).send({messsage: "Error getting user info", success: false, error});

    }
});

module.exports = router;




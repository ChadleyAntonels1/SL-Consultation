const express = require ('express');
const router = express.Router();

const authMiddlewarelec = require("../middleware/authMiddlewarelec")

const Lecturer = require('../models/lecturerModel');
const bcrypt = require('bcrypt');

const jwt = require ('jsonwebtoken')


//Register check if exists/ creates lecturer account
router.post('/register', async(req, res) =>{
 try{
    const lecturerExists = await Lecturer.findOne({email: req.body.email});
    if(lecturerExists){
     return res.status(200)
               .send({message:"lecturer already exists", success: false})
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newlecturer = new Lecturer(req.body);
    await newlecturer.save();
    res.status(200)
       .send({message:"lecturer created successfully",success :true})
 }catch (error){
    res.status(500)
       .send({message:"Error creating lecturer", success:false, error})
 }
});


//Login
router.post('/login', async(req, res)=>{
    try{
        const lecturer = await Lecturer.findOne({email:req.body.email});
        if(!lecturer){
            return res.status(200)
                      .send({message:"lecturer does not exist",success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, lecturer.password);
        if(!isMatch){
            return res.status(200)
                      .send({message:"Password is incorrect", success: false}); 
                    
                 
        }else{
            const token = jwt.sign({id: lecturer._id}, process.env.JWT_SECRET,{
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


router.post('/get-id', authMiddlewarelec, async(req, res)=>{
    try{
        const lecturer = await Lecturer.findOne({_id: req.body.lecturerId})

        if(!lecturer){
            return res
            .status(200)
            .send({ message:"lecturer does not exist", success: false})

        }else{
            res.status(200).send({
                success: true, data:{
                    
                    name: lecturer.name,
                    email: lecturer.email,
                    role: lecturer.role,
                                     
                },
            })
        }

    } catch (error){
        res.status(500).send({messsage: "Error getting lecturer info", success: false, error});

    }
});

module.exports = router;

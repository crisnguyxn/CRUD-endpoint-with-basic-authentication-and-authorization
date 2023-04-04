const asyncWrapper = require("../middlewares/async")
require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const User = require("../models/user");
const { handleError } = require("../errors/custom-error");

const register = asyncWrapper(async(req,res) => {
    const {name,email,password} = req.body
    const salt = await bcrypt.genSalt(saltRounds)
    const passHashed = await bcrypt.hash(password,salt)
    const tempUser = {name,email,password:passHashed}
    const registeredData = await User.create(tempUser)
    res.status(201).json({registeredData})
})

const login = asyncWrapper(async(req,res,next) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return next(handleError(`User with this email: ${req.body.email}`,401))
    }
    const isAuthencated = await bcrypt.compare(password,user.password)
    if(isAuthencated){
        const token  = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.status(200).json({msg:'User logged successfully',token})
    }else{
        return next(handleError(`Authentication failed`,401))
    }
})

module.exports = {register,login}
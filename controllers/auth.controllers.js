const UserModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const { signUpErrors } = require('../utils/error.utils');



const maxAge = 2 * 24 * 60 * 60 * 1000;

function createToken(id){
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge
    })
};


module.exports.signUp = async(req, res) => {
    const {pseudo, nom, prenom, email, password} = req.body 

    try{
        const user = await UserModel.create({pseudo, nom, prenom, email, password});
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = signUpErrors(err);
        res.status(400).send({ errors })
    }
}


module.exports.signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge :maxAge});
        res.status(200).json({user:user._id})
    } 
    catch(err){
        res.status(400).json(err);
    }
}



module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

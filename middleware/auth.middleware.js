const jwt = require ('jsonwebtoken');
const UserModel = require('../models/user.models');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookie.jwt
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
            if(err){
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            } else {
                let user = await UserModel.findById(decodedToken);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
} 
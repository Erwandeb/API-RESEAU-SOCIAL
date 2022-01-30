const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        pseudo:{
            type: String,
            required: true,
            minlength:3,
            maxlength:55,
            unique:true,
            trimp:true,
        },
        nom:{
            type: String,
            required: true,
            minlength:3,
            maxlength:55,
            trimp:true,
        },
        prenom:{
            type: String,
            required: true,
            minlength:2,
            maxlength:55,
            trimp:true,
        },
        email:{
            type:String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        password:{
            type:String,
            required:true,
            max:1024,
            minlength:8,
        },
        picture:{
            type:String,
            default:"" /// Installer une photo d'idendité 
        },
        bio:{
            type:String,
            max:800,
        },
        followers:{
            type:[String],
        },
        following:{
            type: [String]
        },
        likes:{
            type:[String]
        }
    },
    {
        timestamps: true
    }
);


// Crytpage des mot de passes
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// décrytpage des mot de passes
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Mot de passe incorrect !');
    }
    throw Error ('votre email est incorrect');
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
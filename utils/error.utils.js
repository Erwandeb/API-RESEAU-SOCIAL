module.exports.signUpErrors = (err) =>{
    let errors = {pseudo:"", email:"", password:""};

    if(err.message.includes('pseudo')){
        errors.pseudo = "Votre pseudo est incorrect";
    }
 
    
    if(err.message.includes('email')){
        errors.pseudo = "Votre email est incorrect";
    }

    
    if(err.message.includes('password')){
        errors.pseudo = "password trop court !";
    }
  
    
    if(err.code === 11000 & Object.keys(err.keyValue)[0].includes("pseudo")){
        errors.pseudo = "Ce pseudo est déjà pris";
    }
    
    if(err.code === 11000 & Object.keys(err.keyValue)[0].includes("email")){
        errors.pseudo = "Cet email est déjà utilisé";
    }
    

    return errors;
}
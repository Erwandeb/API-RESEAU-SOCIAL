module.exports.signUpErrors = (err) =>{
    let errors = {pseudo:"", email:"", password:""};

    if(err.message.includes('pseudo')){
        errors.pseudo = "Votre pseudo est incorrect ou déjà utilisé";
    }
 
    
    if(err.message.includes('email')){
        errors.pseudo = "Votre email est incorrect ou déjà utilisé";
    }

    
    if(err.message.includes('password')){
        errors.pseudo = "password trop court !";
    }
  
    
    if(err.code === 11000){
        errors.pseudo = "pseudo incorrect ou déjà utilisé";
    }
    

    return errors;
}
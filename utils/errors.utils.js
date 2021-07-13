module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Nickname incorrect or already taken";
  
    if (err.message.includes("email")) 
    errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "The password must be 6 characters minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "This username is already taken";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "This email is already registered";
  
    return errors;
  };


  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email unknown";
    
    if (err.message.includes('password'))
      errors.password = "Password does not match"
      console.log(errors.password,"err")
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
    console.log("err1",errors.format)
      errors.format = "Incompatible format";
  
    if (err.message.includes('max size'))
      errors.maxSize = "The file exceeds 500kb";
      console.log("err2",errors.maxSize)
  
  
    return errors
  }

  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko";
  
    return errors
  }
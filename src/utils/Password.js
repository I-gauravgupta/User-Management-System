const bcrypt= require("bcrypt");



// secure password by hashing
module.exports.securePassword = async(password)=>{
    try {
    return await bcrypt.hash(password,10);  
    } catch (error) {
        console.log(passwordHasingError)
        console.log(error)
    }
}

// check password
module.exports.verifyPassword = async (savedPassword,enteredPassword)=>{
    try {
        return await bcrypt.compare(savedPassword,enteredPassword)
    } catch (error) {
       console.log("passwordCheckError")
       console.log(error) 
    }
}
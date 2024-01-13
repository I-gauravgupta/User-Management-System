const cloudinary = require('cloudinary').v2;
const fs = require("fs")
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET_KEY 
});

module.exports.uploadOnCloudinary = async (loacalFilePath,next)=>{
    try {
        if(!loacalFilePath) return null
    const response = await cloudinary.uploader.upload(loacalFilePath,{
        resource_type:"auto"
    });
    fs.unlink(loacalFilePath, (unlinkErr) => {
        if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
        }
    });
    return response
    } 
    catch (error) {
        fs.unlink(loacalFilePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error("Error deleting file:", unlinkErr);
            }
        });
        
        console.log(error)
        return null
        
    }
}
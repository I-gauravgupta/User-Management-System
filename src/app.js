const express= require("express");
const app = express();
require("./db/connection")
const user_router= require("./routes/routes")
const path = require("path");


//port no
const port = process.env.PORT || 8080;

// code
app.use(user_router)

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"./views"))

app.listen(port,()=>{
    console.log(`server is on port no ${port}`);
});

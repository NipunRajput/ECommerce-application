/**
 * This is the starting point of the project
 */

const express=require('express')
const mongoose=require('mongoose')
const app=express()
const server_config=require("./configs/server.config")
const db_config=require('./configs/db.config')
const user_model=require("./models/user.models")
const bcrypt=require('bcryptjs')
app.use(express.json())
/**
 * Create an admin user at the starting of the application
 * if not already present
 */

//connection with mongoDB server

mongoose.connect(db_config.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("Error while connecting to the mongoDB")
})
db.once("open",()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user=await user_model.findOne({userId:"admin"})
     if(user){
        console.log("Admin is already present")
        return 
    }

    }catch(err){
        console.log("Error while readiong the data", err)
    }
    try{
        user=await user_model.create({
            name:"Nipun Rajput",
            userId:"admin",
            email:"admin@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin Created",user)
    }catch(err){
        console.log("Error while creating admin",err)
    }
}


/**
 * Stich the route to server
 */

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

app.listen(server_config.PORT, ()=>{
    console.log("Server has started at port num:",server_config.PORT)
})
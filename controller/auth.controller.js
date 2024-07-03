/**
 * I need the to write the logic to register a user
 */
const bcrypt=require('bcryptjs')
const user_model=require("../models/user.models")
const JWT=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")
exports.signup=async(req,res)=>{
    /**
     * logic to create the user
     *  
     */  
    
    //1.Read the request body
    const request_body=req.body
    //2.Insert the data in user collection in MongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created=await user_model.create(userObj)
        /**
         * Return this user
         */
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt,
        }
        res.status(201).send(res_obj)
    }catch(err){
        console.log("Error while registering the user",err)
        res.status(500).send({
            message:"Some error happened while registering the user"
        })
    }
    //3.Return the response back to the user

}





exports.signin=async(req,res)=>{
    // check if the user id is present in the system
    const user=await user_model.findOne({userId:req.body.userId})

    if(user==null){
        res.status(400).send({
            message:"User id passed is not a valid id"
        })
    }

    // check if the password is correct
    const ispasswordValid=bcrypt.compareSync(req.body.password,user.password)

    if(!ispasswordValid){
        res.status(401).send({
            message:"Password entered is wrong, please try again!"
        })
    }

    // using JWT generate a token with TTL(time to live) and return

    const token=JWT.sign({id:user.userId},auth_config.secret,{
        expiresIn:120
    })
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
    })
}
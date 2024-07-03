/**
 * Create a middleware , which will check , if the request body is proper and correct
 */
const user_model=require('../models/user.models')
const JWT=require('jsonwebtoken')
const auth_config=require('../configs/auth.config')

const verifysignupBody=async(req,res,next)=>{
    try{
        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                message:"Failed!, Name was not provided in the request body"
            })
        }
        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message:"Failed!, email was not provided in the request body"
            })
        }
        //check for the user
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed!, UserId was not provided in the request body"
            })
        }

        //check if the user with the same userId is already is present
        const user=await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message:"Failed!, User with same id is already present"
            })
        }
        next()

    }catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message:"Error while validating the request body"
        })
    }
}

const verifysigninBody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"UserId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"Password is not provided"
        })
    }
    next()
}


const verifyToken=(req,res,next)=>{
    //check if the token is present in the header
    const token=req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message:"No token found:UnAuthorized"
        })
    }
    //check if it is valid
    JWT.verify(token,auth_config.secret,async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"UnAuthorized"
            })
        }
        const user=await user_model.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message:"UnAuthorized, the user for this token doesn't exist"
            })
        }
        //set the user in the request body
        req.user=user
        next()
    })


    //move to the next step
}

const adminCheck=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"Only Admin users allowed to access this end."
        })
    }
}

module.exports={
    verifysignupBody:verifysignupBody,
    verifysigninBody:verifysigninBody,
    verifyToken:verifyToken,
    adminCheck:adminCheck
}

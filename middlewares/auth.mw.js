/**
 * Create a middleware , which will check , if the request body is proper and correct
 */
const user_model=require('../models/user.models')
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
        const user=await user_model.findOne({userId:req.bodyuserId})
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

module.exports={
    verifysignupBody:verifysignupBody,
    verifysigninBody:verifysigninBody
}

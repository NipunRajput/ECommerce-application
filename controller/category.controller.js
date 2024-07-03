/**
 * controller for creating the category
 * "name":"HouseHold",
    "description":"This will have all the household items"
 */

const category_model=require('../models/category.model')
exports.createNewCategory=async(req,res)=>{
    // read the request body
    //create the category object
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }
    try{
        //insert into mongoDB
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("Error while inserting into mongoDB")
        return res.status(500).send({
            message:"Error while inserting into mongoDB"
        })
    }
    //return the respones of the created category
}

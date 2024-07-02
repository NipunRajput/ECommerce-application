/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * I need to intercept this 
 */

const userModel = require('../models/user.models');
const authController=require('../controller/auth.controller')
const authMW=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifysignupBody],authController.signup)
}
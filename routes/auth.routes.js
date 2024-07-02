/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * I need to intercept this 
 */

const authController=require('./controller/auth.controller')

module.exports=(app)=>{
    app.post("localhost:8888/ecomm/api/v1/auth/signup",authController.signup)
}
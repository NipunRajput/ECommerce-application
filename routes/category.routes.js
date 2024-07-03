/**
 * POST localhost:8888/ecomm/api/v1/categories
 */


category_controller=require('../controller/category.controller')
auth_mw=require('../middlewares/auth.mw')

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken,auth_mw.adminCheck],category_controller.createNewCategory)
}
const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()

router
    .post("/",productController.create)
    .get("/",productController.getAll)
    .get("/:id",productController.getById)
    .patch("/:id",productController.updateById)
    .delete("/:id",productController.deleteById)

module.exports=router
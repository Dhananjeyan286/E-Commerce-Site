import express from "express"
const router=express.Router()
import { createproduct, createreview, deleteproduct, getproducts, getproductsbyid, gettopproducts } from "../controllers/productcontrollers.js"
import {protect,checkisadmin} from "../middlewares/authmiddleware.js"

//route-/api/products

router.route("/").get(getproducts) //this router.route("/") means it goes to "/"(homepage) in tht the method is "get"
router.get("/top",gettopproducts)
router.route("/:id?").post(protect,checkisadmin,createproduct)
router.route("/:id/reviews").post(protect,createreview)
router.route("/:id").get(getproductsbyid).delete(protect,checkisadmin,deleteproduct)

export default router
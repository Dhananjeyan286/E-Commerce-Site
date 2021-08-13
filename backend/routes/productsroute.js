import express from "express"
const router=express.Router()
import { getproducts, getproductsbyid } from "../controllers/productcontrollers.js"

//route-/api/products

router.route("/").get(getproducts) //this router.route("/") means it goes to "/"(homepage) in tht the method is "get"

router.route("/:id").get(getproductsbyid)

export default router
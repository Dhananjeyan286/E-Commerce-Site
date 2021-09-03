import express from "express"
const router=express.Router()
import { addorderitems, getorderitems, updateorder,getmyorder, getorder, updateorder2 } from "../controllers/ordercontrollers.js"
import {protect,checkisadmin} from "../middlewares/authmiddleware.js"

//route-/api/orders


router.route("/").post(protect,addorderitems).get(protect,checkisadmin,getorder)
router.route("/myorder").get(protect,getmyorder)
router.route("/:id").get(protect,getorderitems)//here put "/:id" as the last route because if we put it at the top and if we have a route like "/order"then "order" will be considered as the id
router.route("/:id/pay").put(protect,updateorder)
router.route("/:id/deliver").put(protect,checkisadmin,updateorder2)

export default router
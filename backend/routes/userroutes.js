import express from "express"
const router=express.Router()
import { authuser,getuserprofile,registeruser, updateuserprofile,getallusers, deleteuser, getuser, updateuser } from "../controllers/usercontrollers.js"
import {protect,checkisadmin} from "../middlewares/authmiddleware.js"

//route-/api/user

//router.route("/login").post(authuser)

router.route("/").post(registeruser).get(protect,checkisadmin,getallusers)
router.post("/login",authuser)
router.route("/profile").get(protect,getuserprofile).put(protect,updateuserprofile)
router.route("/:id").delete(protect,checkisadmin,deleteuser).get(protect,checkisadmin,getuser).put(protect,checkisadmin,updateuser)



export default router
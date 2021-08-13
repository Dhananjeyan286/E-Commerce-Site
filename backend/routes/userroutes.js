import express from "express"
const router=express.Router()
import { authuser,getuserprofile,registeruser } from "../controllers/usercontrollers.js"
import {protect} from "../middlewares/authmiddleware.js"

//route-/api/user

//router.route("/login").post(authuser)

router.route("/").post(registeruser)
router.post("/login",authuser)
router.route("/profile").get(protect,getuserprofile)


export default router
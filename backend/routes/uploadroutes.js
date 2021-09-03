import express from "express"
import multer from "multer"
import path from "path"
const router=express.Router()

// /api/upload

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")//this tells in which folder to upload the files
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)//this tells in which format the filename should be present when stored in the databse if suppose the filename which u r uploading is virat.png then file.fieldname will return virat Date.now() returns the current date and then path.extname returns .png therefore the filename wld be virat-27/08/2021.png
    }
})

function checkfiltertype(file,cb){
    const filetypes=/jpg|jpeg|png/
    //this is the pattern to be searched ,this is a regexp where it is separated by pipe symbol which means it is "or" tht is either jpg or jpeg or png
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())//here test() is a regexp method which searches for the pattern in file.originalname everything is converted to lowercase letters before comparison and path.extname returns the extname from file.originalname
    const mimetype=filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)//null is for error nd true is sent to fileFilter stating tht this file as passed the filter test
    }
    else{
        cb("Only jpg,jpeg,png formats are allowed")//this represents the error msg no need to send flase for fileFilter because once the error is sent then it automatically fails the fileFilter test
    }
}

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkfiltertype(file,cb)
    }
})

router.post("/",upload.single("image"),(req,res)=>{
    res.send(`/${req.file.path}`)//this sends the path of the file
})

export default router
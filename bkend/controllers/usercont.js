const umodel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let adduser = async(req,res)=>{
    try{
        let data = await umodel.findById({"_id": req.body._id})
        if(data){
            res.json({"msg":"given mail already exists"})
        }else{
            let hash = await bcrypt.hash(req.body.pwd, 10)
            let user = new umodel({...req.body, "pwd":hash})
            await user.save()
            res.json({"msg":"user added"})
        }
    }catch(err){
        res.json({"msg":"err in add user"})
    }
}

let login = async(req,res)=>{
    try{
        let data = await umodel.findById({"_id":req.body._id})
        if(data){
            let f = await bcrypt.compare(req.body.pwd, data.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":data._id}, "fsd4")  , "_id":data._id, "name":data.name, "role":data.role} )
            }else{
                res.json({"msg":"check pwd"})
            }
        }else{
            res.json({"msg":"check mail"})
        }
    }catch(err){
        res.json({"msg":"error in login"})
    }
} 


module.exports = {adduser, login}
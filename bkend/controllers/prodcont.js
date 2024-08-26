let multer=require("multer")
let {v4:uuid}=require("uuid")
let fs=require("fs")

const pm = require("../models/prodmodel")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  const upload = multer({ storage: storage })

  // add product 
  let add = async(req,res)=>{
    try{
        let data=await pm({...req.body,"pimg":req.file.filename,"_id":uuid()})
        await data.save()
        res.json({"msg":"prod added"})  
    }catch(err){
        res.json({"msg":"err in prod adding"})
    }
  }

  // get product
  let getprod = async(req, res) => {
    try{
        let data = await pm.find({})
        res.json(data)
    }catch(err){
        res.json({"msg":"err in get product"})
    }
  }
  
  //update discount 
  let  upddct = async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id}, {"dct":req.body.dct})
        res.json({"msg":"discont updated"})
    }catch(err){
        res.json({"msg":"err in upd product"})
    }
  }

  //delete discout 
  let deldct = async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id},{$unset:{"dct":""}})
        res.json({"msg":"dct deleted"})
    }catch(err){
        res.json({"msg":"err in deleting discount"})
    }
  }


  //update product 
  let updprod = async(req,res)=>{
    try{
      let data = {...req.body}
      delete data["_id"]
      await pm.findByIdAndUpdate({"_id":req.body._id},data)
      res.json({"msg":"product updated"})
    }catch(err){
      res.json({"msg":"err in updation product"})
    }
  }

  // upd image
  let updimg = async(req,res)=>{
    try{
      let data = await pm.findById({"_id":req.body._id})
      fs.rm(`./pimgs/${data.pimg}`, ()=>{})
      await pm.findByIdAndUpdate({"_id":req.body._id},{"pimg":req.file.filename})
      res.json({"msg":"product image updated"})

    }catch(err){
      res.json({"msg":"err in photo updating"})
    }
  }



  module.exports = {upload, add , getprod, upddct, deldct,updprod, updimg}
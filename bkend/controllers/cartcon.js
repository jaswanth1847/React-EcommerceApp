let {v4:uuid} = require('uuid')
const cm = require('../models/cart')


// items adding cart
let addcart = async(req,res)=>{
    try{
        let obj = await cm.find({"uid":req.body.uid, "pid":req.body.pid})
        if(obj.length === 0){
            let data = await cm({...req.body, "_id":uuid()})
            await data.save()
        }else{
            await cm.findByIdAndUpdate({"_id":obj[0]._id},{$inc :{"qty":1}} ) // incresing qnty (if item available in the cart)
        }
        res.json({"msg":"prod added to cart"})

    }catch(err){
        res.json({"msg":"err in adding cart"})
    }
}

// del cart  items
let delcart = async(req,res)=>{
    try{
        await cm.findByIdAndDelete({"_id":req.params.id})
        res.json({"msg":"cart item deleted"})
    }catch(err){
        res.json({"msg":"err in deleting cart item"})
    }
}

//incrementing qnty
let incqty = async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.body._id}, {$inc:{"qty":1}})
        res.json({"msg":"item incremented"})
    }catch(err){
        res.json({"msg":"err in incrementing qnty"})
    }
}

// decrementing qnty
let decqty = async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.body._id}, {$inc:{"qty":-1}})
        res.json({"msg":"item decremented"})
    }catch(err){
        res.json({"msg":"err in decrementing qnty"})
    }
}

// getting cart of specific user
let getcart = async(req,res)=>{
    try{
        let data = await cm.find({"uid":req.params.uid})
        res.json(data)
    }catch(err){
        res.json({"msg":"err in get cart"})
    }
}


module.exports = {addcart, delcart, incqty, decqty, getcart}


//
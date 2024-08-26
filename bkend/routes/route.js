let express = require("express")
// usercont routes 
const { adduser, login } = require("../controllers/usercont")
// prod cont routes
const { add, getprod, upload, upddct, deldct, updprod, updimg } = require("../controllers/prodcont")
// cart cont routes
const {addcart, delcart, incqty, decqty, getcart} = require("../controllers/cartcon")


let route = new express.Router()
// usercont routes 
route.post("/adduser", adduser) // adding user details, mail(id)
route.post("/login", login)    // login user


// prod cont routes
route.post("/addprod",upload.single("pimg"),add) // adding product data in db
route.get("/getprod", getprod)  // getting product data from db
route.put("/updproddct",upddct) // updating existing product discount
route.put("/delproddct", deldct) //deleting existing prod discount
route.put("/updprod", updprod)  // updating product details
route.put("/updpimg",upload.single("pimg"), updimg)   // updating img based on specific product id

// cart cont routes 
route.post("/addcart", addcart) // item adding into cart
route.put("/delcart/:id", delcart) // deleting existing items in cart based on cart_id
route.put("/inc", incqty)
route.put("/dec", decqty)
route.get("/getcart/:uid", getcart)

module.exports = route
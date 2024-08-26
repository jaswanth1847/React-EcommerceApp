let express = require("express")
let mongoose = require("mongoose")
const cors = require("cors")

const route = require("./routes/route")

let app = express()
app.use(express.json())
app.use(cors())
app.use("/imgs",express.static("./pimgs"))

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>{
    console.log("ok")
})

app.use("/", route)
app.listen(5001)

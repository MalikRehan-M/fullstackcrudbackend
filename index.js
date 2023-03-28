const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
require("dotenv").config()


app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log(`Server is running at port ${processe.env.port}`)
})




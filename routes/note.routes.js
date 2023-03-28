const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const jwt=require("jsonwebtoken")

noteRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.post("/add",async(req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note has been added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "masai");
    const noteID=req.params.noteID
    const payload=req.body
    const reqID=decoded.userID
    const note=NoteModel.findOne({_id:noteID})
    try {
        if(reqID==note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.status(200).send({"msg":"Note has been Updated"})
        }else{
            res.status(200).send({"msg":"Not authorized"})
        }
    } catch (error) {
        res.status(200).send({"msg":error.message})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "masai");
    const noteID=req.params.noteID
    const reqID=decoded.userID
    const note=NoteModel.findOne({_id:noteID})
    try {
        if(reqID==note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":"Note has been deleted"})
        }else{
            res.status(200).send({"msg":"Not authorized"})
        }
    } catch (error) {
        res.status(200).send({"msg":error.message})
    }
})

module.exports={
    noteRouter
}



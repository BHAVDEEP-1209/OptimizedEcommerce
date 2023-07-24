const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");


router.post("/sendMessage",async(req,res)=>{
 
    try {
        const chatId = await Chat.findOne({id : req.body.id});

        if(chatId){
            console.log("update!");
            const result = await Chat.updateOne({id : req.body.id},{ $push : { messages :  req.body.messages.at(0) } });
            res.status(201).json(result);
        }else{
            console.log("create");
            const result = await Chat.create({...req.body});
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json("Error while sending message!");
    }
})

router.get("/getMessages/:id",async(req,res)=>{
    try {
        const id = req.params.id;

        const messages = await Chat.findOne({id : id});
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json("Error while getting Messages");
    }
})

///// get users list
router.get("/getAllUsers",async(req,res)=>{
    try {
        const list = await Chat.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json("Error while fetching users!");
    }
})

module.exports=router;
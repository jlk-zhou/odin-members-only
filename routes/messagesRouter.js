const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");

messagesRouter.get("/new", messagesController.createNewMessageGet); 
messagesRouter.post("/new", messagesController.createNewMessagePost); 

module.exports = messagesRouter; 
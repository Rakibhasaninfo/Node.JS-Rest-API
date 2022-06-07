const express = require('express');
const ProfileController=require("../controllers/ProfileController");
const authVerify = require('../Middleware/authVerify');
const ToDoListController =require("../controllers/ToDoListController")

const router = express.Router();

router.post("/CreateProfile",ProfileController.CreateProfile);
router.post("/LoginUser",ProfileController.LoginUser)
router.get("/SelectProfile",authVerify,ProfileController.SelectProfile)
router.post("/Update",authVerify,ProfileController.UpdateProfile)

router.post("/CreateTodo",authVerify,ToDoListController.CreateTodo)
router.get("/SeleteTodo",authVerify,ToDoListController.SeleteTodo)
router.post("/UpdateTodo",authVerify,ToDoListController.UpdateTodo)
router.post("/UpdateStatus",authVerify,ToDoListController.UpdateStatusToDo)
router.post("/DeleteTodo",authVerify,ToDoListController.RemoveToDo)
router.post("/SeleteTodoStatus",authVerify,ToDoListController.SelectToDoByStatus)
router.post("/SelectToDoByDate",authVerify,ToDoListController.SelectToDoByDate)


module.exports=router;
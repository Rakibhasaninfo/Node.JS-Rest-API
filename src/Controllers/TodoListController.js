const ToDoListModel = require("../Models/TodoListModel");

exports.CreateTodo = (req,res) =>{
    let reqBody = req.body;

    let TodoSubject = reqBody['TodoSubject']
    let TodoDescription = reqBody['TodoDescription']
    let UserName = req.headers['username']
    let TodoStatus = "New"
    let TodoCreateDate = Date.now()
    let TodoUpdateDate = Date.now()

    let PostBody ={
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }
    ToDoListModel.create(PostBody,(err,data) => {
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.SeleteTodo = (req,res) => {
    let Username = req.headers['username']

    ToDoListModel.find({UserName:Username},(err,data) => {
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.UpdateTodo= (req,res) =>{
    let TodoSubject = req.body['TodoSubject']
    let TodoDescription = req.body['TodoDescription']
    let _id = req.body['_id']
    let TodoUpdateDate = Date.now()

    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        _id:_id,
        TodoUpdateDate:TodoUpdateDate


    }
    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data) => {
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.UpdateStatusToDo=(req,res)=>{

    let TodoStatus=req.body['TodoStatus']
    let _id=  req.body['_id']
    let TodoUpdateDate=Date.now();

    let PostBody={
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate,
    }

    ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })

}

exports.RemoveToDo=(req,res)=>{

    let _id=  req.body['_id']

    ToDoListModel.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.SelectToDoByStatus=(req,res)=>{
    let UserName=req.headers['username']
    let TodoStatus=  req.body['TodoStatus']
    ToDoListModel.find({UserName:UserName,TodoStatus:TodoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}


exports.SelectToDoByDate=(req,res)=>{
    let UserName=req.headers['username']
    let FormDate=  req.body['FormDate']
    let ToDate=  req.body['ToDate']

    ToDoListModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}
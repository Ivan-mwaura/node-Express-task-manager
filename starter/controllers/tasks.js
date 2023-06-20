const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async (req, res)=>{

        const tasks = await Task.find({})

        //res.status(200).json({tasks})
        res.status(200).json({Hits:tasks.length, tasks})  
})

const createTask = asyncWrapper( async (req, res)=>{

        const task = await(Task.create(req.body))
        res.status(201).json({task})

})

const getTask = asyncWrapper( async (req, res)=>{

        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        
        if(!task){
             return next(createCustomError(`no task with id : ${taskID}`))
        }

        res.status(200).json({task})

})

const deleteTask = asyncWrapper( async (req, res)=>{

        const{id:taskID}= req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        //error if there is no task with that particular id
        if(!task){
                return next(createCustomError(`no task with id : ${taskID}`))
        }

        //res.status(200).json({task})
        res.status(200).json({task:null, status:"success"})


})

const updateTask = asyncWrapper( async (req, res)=>{

        const{id:taskID} = req.params;
        const data = req.body
        const task = await Task.findOneAndUpdate({_id:taskID}, data,{
            new:true,
            runValidators:true,
        })

         //error if there is no task with that particular id
         if(!task){
                return next(createCustomError(`no task with id : ${taskID}`))
        }
        
        res.status(200).json({ task })
})


module.exports = {
    getAllTasks,createTask,getTask,updateTask, deleteTask
}
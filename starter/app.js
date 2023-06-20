const express = require('express');
const app = express()
const tasks = require('./routes/tasks')
const port = process.env.PORT || 3000;
 const connectDB = require('./db/connect')
 require('dotenv').config()
 const notFound = require('./middleware/notFound')
 const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware for parsing json body
app.use(express.json())
//middleware for parsing static files
app.use(express.static('./public'))


//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
//in this we first connect to our database and then only then if succesfull
//we invoke our server
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}
start()







//app.get('/api/v1/tasks')         -get all task
//app.post('/api/v1/tasks')        -create a new task
//app.get('/api/v1/tasks/:id')     -get single tasks
//app.patch('/api/v1/tasks/:id')   -update tasks
//app.delete('/api/v1/tasks/:id')  -delete task
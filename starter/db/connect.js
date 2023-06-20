const mongoose = require('mongoose')


//the mongoose.connect returns a promise

const connectDB = (url)=>{

    mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })

}

module.exports = connectDB


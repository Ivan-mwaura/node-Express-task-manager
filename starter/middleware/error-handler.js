const { customAPIError } = require("../errors/custom-error")


const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof customAPIError){
        return res.status(404).json({msg:err.message})
    }
    return res.status(500).json({msg:"something went wrong, please try again"})
}

module.exports = errorHandlerMiddleware
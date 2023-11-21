import CustomErrorHandler from "../services/customErrorHandler";

const errorHandler = (err,req,res,next) => {
    let message = {
        status:500,
        msg:err.message,
        success:false
    }
    if (err instanceof CustomErrorHandler) {
        message = {
            status:err.status,
            msg:err.message, 
            success:false
        }
    }
    return res.json(message)
}

export default errorHandler;
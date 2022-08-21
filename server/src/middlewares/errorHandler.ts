import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    const statusCode = err.code || 500
    const message = err.message || 'Something went wrong!'

    return res.status(statusCode).json({ success: false, status: statusCode, message })
}

export default errorHandler

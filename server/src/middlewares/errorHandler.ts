import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err: Error, req, res) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong!'

    return res.status(statusCode).json({ success: false, status: statusCode, message })
}

export default errorHandler

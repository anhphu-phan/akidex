export function createError(code: number, message: string) {
    const error = new Error()
    error.code = code
    error.message = message

    return error
}

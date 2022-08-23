import { RequestHandler } from 'express'
import { createError } from 'utils/errors'
import { vndb } from 'utils/vndb-api'
import { constructVNDBQueryString, parseOptions } from 'utils/vndb-api/helperFunctions'
import { VNDBQueryError } from 'utils/vndb-api/types'

export const searchVisualNovel: RequestHandler = async (req, res, next) => {
    const { title } = req.query
    const options = parseOptions(req.query)

    // const queryString = `get vn basic,anime,screens (title~"${keyword}") ${JSON.stringify(options)}`

    const queryString = constructVNDBQueryString<'vn'>({
        command: 'get',
        type: 'vn',
        flags: ['basic', 'anime', 'details', 'screens'],
        filters: `title~"${title}"`,
        options,
    })

    try {
        const response = await vndb.query(queryString)
        console.log("🚀 ~ file: visualNovel.ts ~ line 23 ~ constsearchVisualNovel:RequestHandler= ~ response", response)
        res.status(200).json(response)
    } catch (error) {
        const message = (error as VNDBQueryError).status
        const code = (error as VNDBQueryError).code

        next(createError(code, message))
    }
}

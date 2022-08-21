import { VNDBQuery, VNDBQueryOptions } from './types'
import {Request} from 'express'

export function constructVNDBQueryString<T extends keyof VNDBQuery>(queryParameters: VNDBQuery[T]): string {
    let queryString = ''

    if (queryParameters.command) {
        queryString += queryParameters.command
    }

    if (queryParameters.type) {
        queryString += ' ' + queryParameters.type
    }

    if (queryParameters.flags) {
        queryString += ' ' + queryParameters.flags.join(',')
    }

    if (queryParameters.filters) {
        queryString += ' (' + queryParameters.filters + ')'
    }

    if (queryParameters.options) {
        queryString += ' ' + JSON.stringify(queryParameters.options)
    }

    return queryString
}

export function parseOptions(queryString: Request['query']) {
    const { page, results, sort, reverse } = queryString
    const options: VNDBQueryOptions = {}

    if (page) {
        options.page = Number(page)
    }

    if (results) {
        options.results = Number(results)
    }

    if (sort) {
        options.sort = sort.toString()
    }

    if (reverse) {
        options.reverse = Boolean(reverse)
    }

    return options
}

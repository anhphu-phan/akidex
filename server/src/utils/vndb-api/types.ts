export interface VNDBQueryError {
    status: string
    code: number
}

type VNDBQueryCommand = 'login' | 'logout' | 'dbstats' | 'get' | 'set'

type VNDBQueryResourceType =
    | 'vn'
    | 'release'
    | 'producer'
    | 'character'
    | 'staff'
    | 'quote'
    | 'user'
    | 'ulist-labels'
    | 'ulist'

type VNDBQueryFlag =
    | 'basic'
    | 'details'
    | 'anime'
    | 'screens'
    | 'relations'
    | 'tags'
    | 'stats'
    | 'staff'
    | 'vn'
    | 'producers'
export interface VNDBQueryOptions {
    /** integer, used for pagination. Page 1 (the default) returns the first 10 results (1-10), page 2 returns the following 10 (11-20), etc. (The actual number of results per page can be set with the "results" option below). */
    page?: number
    /** integer, maximum number of results to return. Also affects the "page" option above. For example: with "page" set to 2 and "results" set to 5, the second five results (that is, results 6-10) will be returned. Default: 10. */
    results?: number
    /** string, the field to order the results by. The accepted field names differ per type, the default sort field is the ID of the database entry. */
    sort?: string
    /** boolean, default false. Set to true to reverse the order of the results. */
    reverse?: boolean
}

export interface VNDBQueryParameters {
    command: VNDBQueryCommand
    type?: VNDBQueryResourceType
    flags?: VNDBQueryFlag[]
    filters?: string
    options?: VNDBQueryOptions
}

interface VNDBQueryVNParameters extends VNDBQueryParameters {
    command: 'get'
    type?: 'vn'
    flags: ('basic' | 'details' | 'anime' | 'relations' | 'tags' | 'stats' | 'screens' | 'staff')[]
    filters?: string
    options?: VNDBQueryOptions
}

interface VNDBQueryRelease extends VNDBQueryParameters {
    command: 'get'
    type?: 'release'
    flags?: ('basic' | 'details' | 'vn' | 'producers')[]
    filters?: string
    options?: VNDBQueryOptions
}

export interface VNDBQuery extends Record<VNDBQueryResourceType, VNDBQueryParameters> {
    vn: VNDBQueryVNParameters
}

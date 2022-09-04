import React from "react"
import { Form, Input } from "./helper-components"
import SearchField from "./SearchField"

const Search = () => {
    return (
            <Form>
                <SearchField />
            <Input label="Genres" select />
            <Input label="Year" select />
            <Input label="Season" select />
            </Form>
    )
}

export default Search

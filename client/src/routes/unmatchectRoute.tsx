import React from 'react'
import { PageNotFound } from "pages";
import { RouteObject } from "react-router-dom";

const unmatchedRoute: RouteObject = {
    path: '*',
    element: <PageNotFound />
}

export default unmatchedRoute
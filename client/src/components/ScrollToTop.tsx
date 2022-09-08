import React, { Fragment, useEffect } from "react"
import { Location, useLocation } from "react-router-dom"

interface State {
    smoothScrolling: boolean
}

interface ScrollToTopProps {
    children: React.ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
    const location = useLocation()
    const state = location.state as State
    const { pathname } = location

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: state?.smoothScrolling ? "smooth" : "auto",
        })
    }, [pathname])

    return <Fragment>{children}</Fragment>
}

export default ScrollToTop

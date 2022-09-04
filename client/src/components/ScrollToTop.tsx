import React, { Fragment, useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

interface ScrollToTopProps {
    children: React.ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
    const location = useLocation()
    const { pathname } = location

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    }, [pathname])

    return <Fragment>{children}</Fragment>
}

export default ScrollToTop

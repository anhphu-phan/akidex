import React, { Fragment, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

interface State {
    smoothScrolling: boolean
}

interface ScrollToTopProps {
    children: React.ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
    const location = useLocation()
    const { id } = useParams()
    const state = location.state as State
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: state?.smoothScrolling ? "smooth" : "auto",
        })
    }, [id])

    return <Fragment>{children}</Fragment>
}

export default ScrollToTop

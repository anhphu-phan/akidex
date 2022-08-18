import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "App"
import "assets/styles/index.css"

import store from "store"
import { Provider } from "react-redux"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </Router>
    </React.StrictMode>
)

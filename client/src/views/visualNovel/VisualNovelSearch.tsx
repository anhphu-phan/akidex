import { Button } from "@mui/material"
import React, { useState, useEffect } from "react"
import net from "net"

// module to send a message to TCP-socket server and wait for the response from socket-server
const sendAndReceive = async (client: any, message: any) => {
    client.write(message)

    let response: any = await new Promise((resolve, reject) => {
        client.on("data", function (data: any) {
            response = data
            resolve(response)
        })
    })

    return response
}

// send a single message to the socket-server and print the response
const sendJSCode = (message: any) => {
    // create socket-client
    const client = net.connect(19535, "api.vndb.org", async function () {
        console.log("Connected")
        
        // send message and receive response
        const response = await sendAndReceive(client, message)

        // parse and print repsonse string
        const stringifiedResponse = Buffer.from(response).toString()
        console.log("from server: ", stringifiedResponse)

        // clean up connection
        client.destroy()
    })
}

const VisualNovelSearch = () => {
    return (
        <div>
            <Button onClick={() => sendJSCode('login {"protocol":1,"client":"Awesome Client","clientver":"1.0"}')}>
                Login
            </Button>
        </div>
    )
}

export default VisualNovelSearch

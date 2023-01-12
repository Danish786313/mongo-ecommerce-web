const http = require('http')

const app = require('./app')

require('dotenv').config()

const server = http.createServer(app)

port = (process.env.port || 5000)
server.listen(port, async () => {
    console.log(`server is runing on Danish http://localhost:${port}`)
})
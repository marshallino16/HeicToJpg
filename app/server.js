const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
var cors = require('cors')

// create the express app
const app = express()

app.use(cors())

// create middleware to handle the serving the app
app.use("/", serveStatic(path.join(__dirname, '/dist')))

// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

// Create default port to serve the app on
const port = process.env.PORT || 8080

app.listen(port)
// Log to feedback that this is actually running
console.log('Server started on port ' + port)
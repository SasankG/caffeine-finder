const express = require("express");
const app = express();
const PORT = process.env.PORT || 9090;
const bodyParser = require('body-parser');
const http = require('http');
const server = http.Server(app);

// Tell body-parser the type of data we are using
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }))

// Require api routes 
require('./routes/apiRoutes')(app);

// Start server
server.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
})
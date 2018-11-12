// provide functionality to spin server
const http= require('http');
const app = require('./app');

// prot 
const port = process.env.PORT || 3000;

// server
const server = http.createServer(app);

server.listen(port);
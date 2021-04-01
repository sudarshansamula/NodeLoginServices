
const http = require('http');
const app = require('../app');
const db = require('../config/dbController');
var config = require('../config/index');
const PORT = config.PORT;

app.set('port', PORT);

const server = (() => http.createServer(app))();
server.listen(PORT);

async function serverHandler() {
    console.log(`Server is UP and listening on port ${PORT}`);
}

async function errorHandler(err) {
    switch (err.code) {
    case 'EACCES':
        console.log('EACCES error');
        break;
    case 'EADDRINUSE':
        console.log('address already in use');
        break;
    default:
        throw err;
    }
    process.exit(1);
}

async function exitHandler() {
    await db.stopListeners();
    console.log('Server STOPPED and database connection CLOSED');
}

server.on('listening', serverHandler);
server.on('error', errorHandler);
process.on('exit', exitHandler);

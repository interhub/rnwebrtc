
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

io.on('connection', socket => {
    socket.on('message', (data) => {
        console.log(data, 'CALL LOAD')
        socket.broadcast.emit('call', data)
    })
});

server.listen(3000, () => {
    console.log('server start on port 3000')
});

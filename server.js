
const path = require('path');
const sup= require('./public/support');
const User = require('./public/classes/User');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io=require('socket.io')(server);
const routes = require('./router')(app);
const bodyParser = require('body-parser');
var fs = require("fs");
let onlineList=new Array();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middleware = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded(),


];

app.use(middleware);

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.locals.list=onlineList;
 //IO
io.on('connection', onConnect);

function onConnect(socket) {


    var contents = fs.readFileSync("./public/rooms.json");
    let rooms = JSON.parse(contents);
    socket.emit('parse',rooms);
    app.locals.socket=socket;

    socket.on('join',function (room,username) {
        socket.join(room);
        socket.room=room;
        socket.user=username;
        const user= new User(username,room,"");
        onlineList.push(user);
        sup.refreshColors(onlineList);
        io.sockets.in(room).emit('joined',sup.countinroom(onlineList,room),sup.findJ(rooms,room));
        io.sockets.in(room).emit('server-message',username + " just joined us, say hello");

    });
    socket.on('message',function (message,room,user) {
        socket.to(room).emit('message',message,user,onlineList[sup.find(user,onlineList)].color);
    })

    socket.on('typing',function (user,room) {
        socket.to(room).emit('typing',user);
    })
    socket.on('stopped-typing',function (user,room) {
        socket.in(room).emit('stopped-typing',user);
    })
    socket.on('disconnect', function(){

        if(socket.room!=undefined){
            if (sup.find(socket.user,onlineList)!=-1)
                onlineList.splice(sup.find(socket.user,onlineList),1);
        socket.leave(socket.room);
        socket.to(socket.room).emit('left',sup.countinroom(onlineList,socket.room));
        socket.to(socket.room).emit('server-message',socket.user+" just left us");}
    });
}

server.listen(3000, () => {
    console.log(`App running at http://localhost:3000`);
});

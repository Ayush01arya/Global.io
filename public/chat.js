import { style, showTypingL, showOnline, createMessage, createSM} from '/client-support.js';
var socket=io.connect();

let typingList=new Array();
var typingTimer;                //timer identifier
var doneTypingInterval = 5000;

socket.emit('join',room,user);


socket.on('joined',function (count,color) {
    style(count,color);
});

socket.on('server-message',function (message) {
    createSM(message);
})
$('#message').submit(function (e) {
    e.preventDefault();
    let ok = true;
    let str=$('#text').val();
    if($('#text').val().length>255){
        ok=confirm('your message is over the maximum length, only a part of it will be sent are you sure you want to send it?')
        if(ok){
            str=$('#text').val().substr(0,255);
        }
    }
    if(ok) {
        socket.emit('message', str, room, user);
        createMessage("you",str,"black",'messageR')

        socket.emit('stopped-typing', user, room);
    }
    return false;
});

socket.on('message',function(message,user,color) {
   createMessage(user,message,color,'messageL')

});


$('#text').on('change', function () {
    socket.emit('typing',user,room);

    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

$('#text').on('keydown', function () {
    clearTimeout(typingTimer);
});

socket.on('typing',function (user) {
    typingList.push(user);
    showTypingL(typingList);
});

socket.on('stopped-typing',function (user) {
    let index= typingList.indexOf(user);
    if(index>-1){
        typingList.splice(index,1);
    }
    showTypingL(typingList);
});

socket.on('left', function(count){
   showOnline(count);
});


function doneTyping () {
    socket.emit('stopped-typing',user,room);
}


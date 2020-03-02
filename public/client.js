var socket = io();


socket.on('parse',function (rooms) {
    options(rooms);
    console.log('parsed')
});

function options(json) {
    let select = document.getElementsByTagName('select')[0];
    for (var key in json){
        let node = document.createElement('option');
        node.setAttribute('value',json[key]["name"]);
        node.innerHTML=json[key]["name"];
        select.appendChild(node);
    }}
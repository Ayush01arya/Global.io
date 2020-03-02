

export function style(count,color) {
    let chat = document.getElementById('chat-area');

    showOnline(count);
    chat.style.backgroundColor =color;
    document.getElementById('roomname').style.border='3px solid '+color;
    document.getElementById('roomname').style.color=color;

    document.getElementById('typing').style.border='3px solid '+color;
    document.getElementById('online').style.backgroundColor=color;

}
export function showTypingL(list) {
    let typing=document.getElementById('typing');
    typing.innerHTML="Typing: ";

    for(var key in list){
        typing.innerHTML+=list[key]+", ";
    }
}

export function createMessage(title, text, color,type){
    let chat = document.getElementById('chat-area');

    let node = document.createElement('div');
    node.setAttribute('class', type);
    node.classList.add('messageG');

    let tit = document.createElement('h3');
    tit.setAttribute('class', 'user');
    tit.innerHTML = title;
    tit.style.color=color;
    let content = document.createElement('p');
    content.setAttribute('class', 'content');
    content.innerHTML = text;
    node.append(tit);
    node.append(content);
    chat.append(node);
}

export function createSM(text) {
    let chat = document.getElementById('chat-area');
    let node = document.createElement('div');
    node.setAttribute('class','messageC');
    node.classList.add('messageG');

    node.innerHTML=text;
    chat.appendChild(node);
}

export function showOnline(count) {
    let online= document.getElementById('online');

    if(count==1)
        online.innerHTML='You are the only one debating here, invite a friend';
    else
        online.innerHTML='You and '+(count-1)+' are debating here';
}

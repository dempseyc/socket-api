let connection;
let clientId = 'anon';

function connect () {
    return new Promise((resolve,reject)=> {
        const socket = new WebSocket("ws://127.0.0.1:8765/");
        socket.onopen = () => resolve(socket);
    });
}
connect().then((socket)=>{
    socket.onmessage = (event) => {
        handleMessages(event)
    }
    connection = socket;
});

// cache DOM
let room_list = document.getElementById('room-list');
let messages_list = document.getElementById('room-chat-messages');
let chat_form = document.getElementById('room-chat-form');
chat_form.addEventListener('submit', pubMessage);

// handle ws events

function handleMessages (e) {
    let data = JSON.parse(e.data);
    console.log(data);
    switch (data.tag) {
        case 'clients':
            updateClientList(data);
            break;
        case 'register':
            clientId = data.text;
            break;
        case 'public':
            updateMessagesList(data);
            break;
        case 'game':
            handleGameMessages(data);
        default:
            break
    }

};

function updateMessagesList(data) {
    let new_message = document.createElement('li');
    new_message.innerHTML = `<span>${data.sender}: ${data.text}</span>`;
    messages_list.appendChild(new_message);
}

function updateClientList(data) {
let new_list = data.list.map((clientHandle) => `<li>${clientHandle}</li>`).join('');
    room_list.innerHTML = new_list;
}

function pubMessage (event) {
    event.preventDefault();
    let txt = event.target.elements[0].value;
    let tag = 'public';
    let message = `{"tag":"${tag}", "sender":"${clientId}", "text":"${txt}"}`; 
    connection.send(message);
}

///////////////////////// game stuff

let oppData = document.getElementById('opponent');
let avtData = document.getElementById('avatar');
let board = document.getElementById('board');

avtData.addEventListener('click', () => {
    registerPlayer();
    // updateAvtData();
 });

function registerPlayer() {
    let message = `{"tag": "game", "sender":"${clientId}", "receiver": "game", "text":"join"}`;
    connection.send(message);
}

function handleGameMessages(data) {
    switch (data.text) {
        case 'join1':
            if (data.sender == clientId) {
                updateAvtData(1);
            } else {
                updateOppData(data.sender,1);
            }
            break;
        case 'join2':
            if (data.sender == clientId) {
                updateAvtData(2);
            } else {
                updateOppData(data.sender,2);
            }
            break;
        case 'move':
            console.log('move made');
            break;
        case 'card':
            console.log('card drawn');
            break;
        default:
            break;
    }
}

function updateAvtData(playerNum) {
    avtData.innerHTML = `<span>${clientId} as Player${playerNum}</span>`;
}

function updateOppData(oppId,playerNum) {
    oppData.innerHTML = `<span>${oppId} as Player${playerNum}</span>`;
}
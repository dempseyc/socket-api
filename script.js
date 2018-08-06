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
let messages_list = document.getElementById('chat-messages');
let chat_form = document.getElementById('chat-form');
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
    // if (connection.readyState == 1) {
        connection.send(message);
    // }
}
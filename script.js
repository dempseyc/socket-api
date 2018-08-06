let connection;

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

let messages_list = document.getElementById('chat-messages');
let chat_form = document.getElementById('chat-form');
chat_form.addEventListener('submit', sendMessage);

// handle ws events

function handleMessages (event) {
    console.log(event.data);
    // let new_message = document.createElement('li');
    // let content = document.createTextNode(event.data);
    // new_message.appendChild(content);
    // messages_list.appendChild(new_message);
};

function sendMessage (event) {
    event.preventDefault();
    let txt = event.target.elements[0].value;
    let tag = 'public';
    let message = `{"tag":"${tag}","text":"${txt}"}`; 
    if (connection.readyState == 1) {
        connection.send(message);
    }
    // console.log(event.target.elements[0].value);
}
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
        case 'direct':
            updateMessagesList(data);
            if (data.sender === 'game') { handleGameMessages(data); }
            break;
        case 'game':
            handleGameMessages(data);
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
    connection.send(message);
}

///////////////////////// game stuff

let oppData = document.getElementById('opponent');
let avtData = document.getElementById('avatar');
let board = document.getElementById('board');
let playerList = [];

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
            playerList.push(data.sender);
            if (data.sender == clientId) {
                updateAvtData('join',data.sender,1);
            } else {
                updateOppData('join',data.sender,1);
            }
            break;
        case 'join2':
            playerList.push(data.sender);
            if (data.sender == clientId) {
                updateAvtData('join',data.sender,2);
            } else {
                updateOppData('join',data.sender,2);
                let message = `{"tag": "game", "sender":"${clientId}", "receiver": "game", "text":"ready"}`;
                connection.send(message);
            }
            break;
        case 'try later.':
            updateAvtData('reject',playerList[0],1);
            updateOppData('reject',playerList[1],2);
            break;
        case 'start':
            updateBoard();
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

function updateAvtData(uType,player,playerNum) {
    switch (uType) {
        case 'join':
            avtData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            break;
        case 'reject':
            avtData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            break;
        default:
            console.log('unknown');
            break;
    }
}

function updateOppData(uType,player,playerNum) {
    switch (uType) {
        case 'join':
            oppData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            break;
        case 'reject':
            oppData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            break;
        default:
            console.log('unknown');
            break;
    }
}

function updateBoard(boardArr = 'blank') {
    if (boardArr === 'blank') {
        buildBoard();
    }
    else {
        console.log('board updated');
    }
}

function buildBoard() {
    let cols = ['0','1','2','3','4'];
    let rows = ['0','1','2','3','4'];
    let square = (r,c) => {
        let id = `s-${r}${c}`;
        return `<div class ="square" id="${id}"></div>`
    }
    let grid = rows.map( (r) => cols.map( (c) => square(r+c) ) );
    let squares = grid.map( (r) => r.join('') ).join('');
    board.innerHTML = squares;
}
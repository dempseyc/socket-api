import './style.css'

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
chat_form.addEventListener('submit', sendPubMessage);

// handle ws events

function handleMessages (e) {
    let message = JSON.parse(e.data);
    console.log(message);
    switch (message.tag) {
        case 'clients':
            updateClientList(message);
            break;
        case 'register':
            clientId = message.text;
            break;
        case 'public':
            updateMessagesList(message);
            break;
        case 'direct':
            updateMessagesList(message);
            if (message.sender === 'game') { handleGameMessages(message); }
            break;
        case 'game':
            handleGameMessages(message);
            break;
        default:
            break
    }

};

function updateMessagesList(message) {
    let new_message = document.createElement('li');
    new_message.innerHTML = `<span>${message.sender}: ${message.text}</span>`;
    messages_list.appendChild(new_message);
}

function updateClientList(message) {
let new_list = message.list.map((clientHandle) => `<li>${clientHandle}</li>`).join('');
    room_list.innerHTML = new_list;
}

function sendPubMessage (event) {
    event.preventDefault();
    let text = event.target.elements[0].value;
    let tag = 'public';
    let m = {
        "tag": tag,
        "sender": clientId,
        "text": text
        }; 
    connection.send(JSON.stringify(m));
    event.target.elements[0].value = '';
}

///////////////////////// game stuff
let gameOn = false;
let myTurn = false;

let playerList = [];
let myNum = null;
let board = document.getElementById('board');
let oppData = document.getElementById('opponent');
let avtData = document.getElementById('avatar');
let cards = [];
let chosenC = null;
let colors = ['color1','color2'];
let cardColor = ()=>colors[myNum-1];

avtData.addEventListener('click', () => {
    if (!gameOn) {
        registerPlayer();
    }
    // updateAvtData();
 });

function registerPlayer() {
    let m = {
        "tag": "game",
        "sender": clientId,
        "receiver": "game",
        "text": "join"
        };
    connection.send(JSON.stringify(m));
    gameOn = true;
}

function handleGameMessages(message) {
    switch (message.text) {
        case 'join1':
            playerList.push(message.sender);
            if (message.sender == clientId) {
                myNum = 1;
                updateAvtData('join',message.sender,myNum);
                updateAvtData('my_turn');
            } else {
                updateOppData('join',message.sender,1);
            }
            break;
        case 'join2':
            playerList.push(message.sender);
            console.log(playerList);
            if (message.sender == clientId) {
                myNum = 2;
                updateAvtData('join',message.sender,myNum);
            } else {
                updateOppData('join',message.sender,2);
            }
            if (playerList[0] === clientId) {
                let m = {
                    "tag": "game",
                    "sender": clientId,
                    "receiver": "game",
                    "text":"ready"
                };
                connection.send(JSON.stringify(m));
            }
            break;
        case 'try later.':
            updateAvtData('reject',playerList[0],1);
            updateOppData('reject',playerList[1],2);
            break;
        case 'start':
            updateBoard();
            break;
        case 'board':
            updateBoard(message.data);
            updateAvtData('my_turn');
            break;
        case 'cards':
            cards = message.data;
            updateAvtData('cards');
            break;
        case 'reset':
            updateBoard();
            updateAvtData('reset');
            updateOppData('reset');
            playerList = [];
            gameOn = false;
            break;
        default:
            break;
    }
}

function updateAvtData(uType,player,playerNum) {
    switch (uType) {
        case 'join':
            avtData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            updateCardContainer();
            break;
        case 'reject':
            avtData.innerHTML = `<span>${player} as Player${playerNum}</span>`;
            break;
        case 'reset':
            avtData.innerHTML = `<span>waiting for opponent...</span>`;
            break;
        case 'cards':
            updateCardContainer('cards');
            break;
        case 'my_turn':
            myTurn = myTurn ? false : true;
            myTurn ? avtData.classList.add('my-turn') : avtData.classList.remove('my-turn');
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
        case 'reset':
            oppData.innerHTML = `<span>click to play</span>`;
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
        boardArr.forEach((r,i)=> r.forEach((c,j)=>{
            if (c !== null) {
                let idx = 's-'+String(i)+String(j);
                let p_c = c.split('-');
                let square = document.getElementById(`${idx}`);
                square.classList.add(`color${p_c[0]}`);
            }
        }));
        console.log('board updated', boardArr);
    }
}

function buildBoard() {
    listenSquares();
    // let cols = ['0','1','2','3','4'];
    // let rows = ['0','1','2','3','4'];
    // let square = (r,c) => {
    //     let id = `s-${r}${c}`;
    //     return `<div class ="square" id="${id}"></div>`
    // }
    // let grid = rows.map( (r) => cols.map( (c) => square(`${r}${c}`) ) );
    // let squares = grid.map( (r) => r.join('') ).join('');
    // board.innerHTML = squares;
    console.log("board ready");
}

function updateCardContainer(change, idx) {
    let cardContainer = document.getElementsByClassName('card-container')[0];
    if (!cardContainer) {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        avtData.appendChild(cardContainer);
        // console.log(cardContainer);
    } else {
        switch(change) {
            case 'cards':
                cards.forEach((c,i) => {
                    let card = document.createElement('div');
                    card.setAttribute('id',`pid-${i}`);
                    card.classList.add('card',`p-${c}`,`${cardColor()}`);
                    card.innerHTML = `${c}`;
                    cardContainer.appendChild(card);
                });
                listenCards();
                break;
            default:
                break
        }
    }
}

function listenSquares() {
    let ss = document.getElementsByClassName('square');
    [].forEach.call(ss, (s) => {
        s.addEventListener('click', chooseSquare);
    });
}

function listenCards() {
    let cards = document.getElementsByClassName('card');
    [].forEach.call(cards, (card) => {
        card.addEventListener('click', chooseCard); 
    });
}

function chooseCard(event) {
    let cards = document.getElementsByClassName('card');
    [].forEach.call(cards, (card) => {
        card.classList.remove('chosen');
    });
    event.target.classList.add('chosen');
    chosenC = event.target.getAttribute('id');
}

function chooseSquare(event) {
    let square = event.target;
    if (myTurn) {
        let card = document.getElementById(chosenC);
        let cardVal = card.classList[1];
        if (square.classList[1] !== 'occupied') {
            square.classList.add('occupied', `${myNum}`, `${chosenC}`);
            //make move
            let squareId = square.getAttribute('id');
            // console.log('dispatch move', cardVal, squareId);
            sendMove(cardVal, squareId);
            card.classList.add('nodisplay');
        } 
    }
}

function sendMove(card, square) {
    let c = card.split('-')[1];
    let s = square.split('-')[1];
    let m = {
        "tag": "game",
        "sender": `${clientId}`,
        "receiver": "game",
        "text": "move",
        "data": [myNum,c,s]
    }
    connection.send(JSON.stringify(m));
}
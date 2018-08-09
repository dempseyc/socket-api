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
    let message = `{"tag": "game", "sender":"${clientId}", "receiver": "game", "text":"join"}`;
    connection.send(message);
    gameOn = true;
}

function handleGameMessages(data) {
    switch (data.text) {
        case 'join1':
            playerList.push(data.sender);
            if (data.sender == clientId) {
                myNum = 1;
                updateAvtData('join',data.sender,myNum);
                updateAvtData('my_turn');
            } else {
                updateOppData('join',data.sender,1);
            }
            break;
        case 'join2':
            playerList.push(data.sender);
            if (data.sender == clientId) {
                myNum = 2;
                updateAvtData('join',data.sender,myNum);
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
        case 'board':
            updateBoard(data.board);
            updateAvtData('my_turn');
            break;
        case 'cards':
            cards = data.board;
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
    if (myTurn) {
        let card = document.getElementById(chosenC);
        let cardVal = card.classList[1];
        event.target.classList.add('occupied', `${myNum}`, `${chosenC}`);
        //make move
        let squareId = event.target.getAttribute('id');
        // console.log('dispatch move', cardVal, squareId);
        dispatchMove(cardVal, squareId);
        card.classList.add('nodisplay');
    }
}

function dispatchMove(card, square) {
    let c = card.split('-')[1];
    let s = square.split('-')[1];
    let message = {
        "tag": "game",
        "sender": `${clientId}`,
        "receiver": "game",
        "text": "move",
        "board": [myNum,c,s]
    }
    connection.send(JSON.stringify(message));
}
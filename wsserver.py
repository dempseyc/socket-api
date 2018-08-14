import websockets
import asyncio
import json
import logging
import string
import random

import game

logging.basicConfig()

STATE = {'value': 0}

clients = {}

game = game.Game()

def createID(n):
    chars = string.ascii_letters
    new_id = ""
    for i in range(n):
        new_id += random.choice(chars)
    return new_id;

def clients_event():
    c_list = list(clients)
    return json.dumps({'tag': 'clients', 'count': len(clients), 'list': c_list, 'players': game.players })

def message_event(data = {'tag': 'hello', 'sender': 'server', 'text': 'hello!'}):
    return json.dumps(data)

async def notify_public_message(data):
    if clients:
        ms = message_event(data)
        await asyncio.wait([client.send(ms) for key,client in clients.items()])

async def notify_client(data):
    if clients:
        client = data['receiver']
        ms = message_event(data)
    await clients[client].send(ms)

async def notify_clients():
    if clients:
        message = clients_event()
        await asyncio.wait([client.send(message) for key,client in clients.items()])

async def register(websocket, cid):
    clients[cid] = websocket
    await notify_clients()

async def sendCID(cid):
    await clients[cid].send(message_event({'tag':'register','sender':'server','to':cid,'text':cid}))

async def unregister(cid):
    clients.pop(cid, None)
    await notify_clients()
    if cid in game.players:
        data = game.reset()
        await notify_public_message(data)
        data['tag'] = 'public'
        data['text'] = 'a player quit, game reset'
        await notify_public_message(data)

async def handleGame(data):
    if (data['text'] == 'join' and game.game_on == False):
        playerNum = game.add_player(data['sender'])
        data['text'] = f'join{str(playerNum)}'
        await notify_public_message(data)
    elif (data['text'] == 'join' and game.game_on == True):
        data = game.add_player(data['sender'])
        await notify_client(data)
    elif (data['text'] == 'ready'):
        data['text'] = 'start'
        data['sender'] = 'game'
        await notify_public_message(data)
        cards = game.deal_3(1)
        await notify_client(cards)
        cards = game.deal_3(2)
        await notify_client(cards)
    elif (data['text'] == 'move'):
        is_bomb = False
        if (len(data['data'])>3):
            is_bomb = True
        data = game.process_message(data)
        await notify_public_message(data)
        if (not is_bomb):
            player = game.players.index(game.whos_turn)+1
            cards = game.deal_1(player)
            await notify_client(cards)
        win_state = game.check_win_state()
        if (win_state[0]):
            print('win')
            data = game.create_win_message(win_state[1])
            await notify_public_message(data)
            data = game.reset()
            await notify_public_message(data)
        else:
            game.switch_turn()

async def room(websocket, path):
    cid = createID(4)
    await register(websocket, cid)
    await sendCID(cid)
    try:
        await websocket.send(message_event())
        async for message in websocket:
            data = json.loads(message)
            if data['tag'] == 'public':
                await notify_public_message(data)
            elif data['tag'] == 'direct':
                await notify_client(data)
            elif data['tag'] == 'game':
                await handleGame(data)
            else:
                logging.error(
                    "unsupported event: {}", data)
    finally:
        await unregister(cid)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(room, '127.0.0.1', 8765))
asyncio.get_event_loop().run_forever()
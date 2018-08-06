import websockets
import asyncio
import json
import logging
import string
import random

logging.basicConfig()

STATE = {'value': 0}

clients = {}

def createID(n):
    chars = string.ascii_letters
    new_id = ""
    for i in range(n):
        new_id += random.choice(chars)
    return new_id;

def clients_event():
    return json.dumps({'tag': 'clients', 'count': len(clients)})

def room_event(tag='public',message=''):
    return json.dumps({'tag': f'{tag}', 'text':f'{message}'})

def private_event(data):
    return json.dumps(data)

async def notify_public_message(message):
    if clients:
        ms = room_event('public', message)
        await asyncio.wait([client.send(ms) for key,client in clients.items()])

async def notify_client(data):
    if clients:
        ms = private_event(data)
        client = ms['to']
    await clients[client].send()

async def notify_clients():
    if clients:
        message = clients_event()
        await asyncio.wait([client.send(message) for key,client in clients.items()])

async def register(websocket, cid):
    clients[cid] = websocket
    print(clients)
    await notify_clients()


async def unregister(cid):
    clients.pop(cid, None)
    await notify_clients()

async def room(websocket, path):
    cid = createID(4)
    await register(websocket, cid)
    try:
        await websocket.send(room_event())
        async for message in websocket:
            data = json.loads(message)
            if data['tag'] == 'public':
                message = data['text']
                await notify_public_message(message)
            if data['tag'] == 'direct':
                await notify_client(data)
            else:
                logging.error(
                    "unsupported event: {}", data)
    finally:
        await unregister(cid)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(room, '127.0.0.1', 8765))
asyncio.get_event_loop().run_forever()
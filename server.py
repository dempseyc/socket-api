import asyncio
import websockets
import json
import string
import random

clients = {}

chars = string.ascii_letters
length = 4

def createID(n):
    new_id = ""
    for i in range(n):
        new_id += random.choice(chars)
    return new_id;

async def handleClient(websocket, path):
    cid = createID(length)
    clients[cid] = websocket
    try:
        await asyncio.wait( [ws.send(f"{key} connected") for key,ws in clients.items()] )
        [ print(f"{key} connected") for key,ws in clients.items() ]
        await asyncio.sleep(10)

        message = await websocket.recv()
        # mss['type'] and mss['text']
        mss = json.loads(message)
        await asyncio.wait( [ ws.send(json.dumps(mss)) for key,ws in clients.items() ] )
        await asyncio.sleep(10)
    finally:
        # Unregister.
        clients.pop(cid, None)


start_server = websockets.serve(handleClient, '127.0.0.1', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
print("server on 8765")
asyncio.get_event_loop().run_forever()
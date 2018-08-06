import asyncio
import websockets
import json
import string
import random

clients = {}

def createID(n):
    chars = string.ascii_letters
    new_id = ""
    for i in range(n):
        new_id += random.choice(chars)
    return new_id;

async def handleClient(websocket, path):
    cid = createID(4)
    clients[cid] = websocket
    try:
        await asyncio.wait( [ws.send(f"{key} connected") for key,ws in clients.items()] )
        [ print(f"{key} connected") for key,ws in clients.items() ]
        await asyncio.sleep(10)

        messages = []
        # if (websocket):
        for key,ws in clients.items():
            message = await ws.recv()
            messages.append(message)
        
        # mss['type'] and mss['text']
        mses = [ json.loads(ms) for ms in messages ]
        await asyncio.wait( [ ws.send(json.dumps(ms)) for ms in mses for key,ws in clients.items() ] )
        await asyncio.sleep(10)
    finally:
        # Unregister.
        clients.pop(cid, None)


start_server = websockets.serve(handleClient, '127.0.0.1', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
print("server on 8765")
asyncio.get_event_loop().run_forever()
# rtp-backend/socket_events.py
from flask_socketio import emit, join_room

def handle_join(socketio):
    @socketio.on('join')
    def on_join(data):
        room = data['room']
        username = data.get('username', 'Guest')
        join_room(room)
        emit('message', {'msg': f"{username} has joined the room."}, room=room)

def handle_code_change(socketio):
    @socketio.on('code-change')
    def code_change(data):
        room = data['room']
        code = data['code']
        emit('code-update', code, room=room)

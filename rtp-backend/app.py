# rtp-backend/app.py
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from firebase_config import db
import firebase_admin
from firebase_admin import auth
from auth_middleware import verify_auth

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('message', {'msg': f"{data['username']} has joined the room."}, room=room)

@socketio.on('code-change')
def code_change(data):
    room = data['room']
    code = data['code']
    emit('code-update', code, room=room)

@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization').split('Bearer ')[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return jsonify({"message": f"Welcome {decoded_token['name']}"}), 200
    except Exception as e:
        return jsonify({"error": "Unauthorized"}), 403


if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)

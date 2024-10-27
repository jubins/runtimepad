# rtp-backend/app.py
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS  # Import CORS
from firebase_config import db
from firebase_admin import auth
from auth_middleware import verify_auth
from session_manager import create_new_session
import socket_events

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all resources
socketio = SocketIO(app, cors_allowed_origins="*")

# Register socket event handlers
socket_events.handle_join(socketio)
socket_events.handle_code_change(socketio)

# Endpoint to create a new pad and generate a UUID
@app.route('/create_pad', methods=['POST'])
def create_pad():
    print('JJpad hit!!')
    pad_id = create_new_session()  # Generate new pad ID
    return jsonify({"padId": pad_id}), 200

# A sample protected route to demonstrate Firebase authentication
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

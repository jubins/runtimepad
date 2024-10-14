# rtp-backend/auth_middleware.py
from flask import request, jsonify
from functools import wraps
from firebase_admin import auth

def verify_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token:
            try:
                token = token.split("Bearer ")[1]
                decoded_token = auth.verify_id_token(token)
                request.user = decoded_token
                return f(*args, **kwargs)
            except Exception as e:
                return jsonify({"error": "Unauthorized"}), 403
        else:
            return jsonify({"error": "Missing authorization token"}), 403
    return decorated_function

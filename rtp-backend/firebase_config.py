# rtp-backend/firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("config/runtimepad-firebase-adminsdk-88ue9-6b7ea10696.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
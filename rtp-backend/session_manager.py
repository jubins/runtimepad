# rtp-backend/session_manager.py
import uuid

def create_new_session():
    """Generate a new unique session ID (UUID)."""
    return str(uuid.uuid4())

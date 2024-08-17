import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or '7d3df70638f17288381c278224819e02fe5a3dddf967768d5cf0ac953a6f932c'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://jubinsoni:jubinsoni@localhost/runtimepad'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

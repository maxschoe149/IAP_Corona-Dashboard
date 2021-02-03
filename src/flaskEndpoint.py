from flask import Flask, request, send_from_directory
from flask_cors import CORS
import json
import os

CURRENT_DIR = current_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)


@app.route('/dataWorld')
def dataWorld():
    
    file = open(CURRENT_DIR + '/../api_files/world.json')

    return file


@app.route('/')
def default():
    return '''<h1>IAP_Corona_Dashboard - Flask-Endpoint</h1>'''
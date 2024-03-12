from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import json  
app = Flask(__name__)
CORS(app)

@app.route('/')
def run_filename():
    try:
        result = subprocess.check_output(['python', 'name.py'], stderr=subprocess.STDOUT)
        json_data = json.loads(result)
        return jsonify(json_data)
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f"{e.output.decode('utf-8')}"})

if __name__ == '__main__':
    app.run(debug=True)

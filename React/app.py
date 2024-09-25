from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/example')
def home():
	return "Testing out the website with Flask!"

if __name__ == '__main__':
	app.run(debug=True)

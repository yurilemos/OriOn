from flask import Flask, request

UNSPLASH_URL='https://api.unsplash.com/photos/random'
UNSPLASH_KEY='5gv2QQmDKIw1HZVCkVYC1ivuJ9aAYyURpf-xs6VHOyE'

app = Flask(__name__)

@app.route("/new-image")
def new_image():
  word = request.args.get("query")
  return {"word": word}

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5050)
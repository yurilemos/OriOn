from app import app
import requests
from flask import request


@app.route("/")
def index():
    return "teste"


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID "}
    params = {"query": word}
    response = requests.get(url="teste", headers=headers, params=params)

    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read image from the database
        # images = images_collection.find({})
        # return jsonify([img for img in images])
        return
    if request.method == "POST":
        # save image from the database
        image = request.get_json()
        image["_id"] = image.get("id")
        # result = images_collection.insert_one(image)
        # inserted_id = result.inserted_id
        inserted_id = ""
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        # delete image from the database
        # result = images_collection.delete_one({"_id": image_id})
        result = ""
        if not result:
            return {"error": "Image wasn't deleted. Please try again"}, 500
        # if result and not result.deleted_count:
        # return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}

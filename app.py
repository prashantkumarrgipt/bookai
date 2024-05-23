from flask import Flask, render_template, jsonify, request , session, abort, redirect
from flask_pymongo import PyMongo
import openai
import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests


app = Flask(__name__)
# app.config["MONGO_URI"] 
# mongo = PyMongo(app)

# set your gpt api here
# openai api key


# set your  key here
# make sure this matches with that's in client  json
# app  key 

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

# set google client id
# GOOGLE CLIENT ID 


# def login_is_required(function):
#     def wrapper(*args, **kwargs):
#         if "google_id" not in session:
#             return abort(401)  # Authorization required
#         else:
#             return function()

#     return wrapper

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return redirect("/")  # Redirect to the home page if not logged in
        return function(*args, **kwargs)

    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    google_id = id_info.get("sub")
    # name = id_info.get("name")

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    print(f''' \n \n \n \n \n{google_id} \n \n \n \n \n{session} \n \n \n \n \n''')


    return redirect("/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")



@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"



@app.route("/")
def home():
    if "google_id" in session:
        return render_template("login.html")
    else:
        return render_template("index.html")

    # chats = mongo.db.chats.find({})
    # myChats = [chat for chat in chats]
    # print(myChats)
    # return render_template("index.html", myChats = myChats)

@app.route("/plan")
def plan():
    return render_template("plan.html")

@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        print(request.json)
        ques = request.json.get("question")
        bookName = request.json.get("bookName")
        author = request.json.get("author")

        
        question = "write answer of this question related to book name - " + bookName + " and author " + author + " ques is - " + ques
        
        response = openai.Completion.create(
                model="text-davinci-003",
                prompt=question,
                temperature=0.7,
                max_tokens=512,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
                )
        temp = response["choices"][0]["text"]

        temp = temp.replace("\n", " ") 
        print(f"Response - {temp}")


        data = {"question": question, "answer": temp , "bookName": bookName , "author" : author}

        print(data)

        #     # mongo.db.chats.insert_one({"question": question, "answer": response["choices"][0]["text"]})
        #     return jsonify(data)
    # data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
        
        return jsonify(data)
    return jsonify({"question": "ahusdoj question", "answer": "hello its ai"})

app.run(debug=True, port=5001)
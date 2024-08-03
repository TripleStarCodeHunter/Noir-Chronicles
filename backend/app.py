from flask import Flask,request,jsonify
import json
from flask_cors import CORS, cross_origin



app = Flask(__name__)
CORS(app)


"""
    Install the Google AI Python SDK

    $ pip install google-generativeai

    See the getting started guide for more information:
    https://ai.google.dev/gemini-api/docs/get-started/python
    """

import os

import google.generativeai as genai

genai.configure(api_key="AIzaSyAiU1xIWXdK3lLlgdCDIRIjISkVMdEoWpU")

    # Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
    }

model = genai.GenerativeModel(
model_name="gemini-1.5-flash",
generation_config=generation_config,
    # safety_settings = Adjust safety settings
    # See https://ai.google.dev/gemini-api/docs/safety-settings
system_instruction="I want to develop a user centric detective game that has gemini at its back end and develops the game plot according to user prompts.\nThe user is explained the initial game scenario via a text based description. The user can then interrogate suspects to uncover new clues and suspects . The game has various location. The is prominently text based that is user can interact only through chat and gemini responds through chat itself. The game story should be layered and extensive so that user spends some time before finishing the game.\n\nYou have to act out every character in the story. Feel free to add any plot twists. You also have to provide the initial scenario and the characters\n\nTo indicate which text in meant for which character, we will prefix the text with character name\n\nThe story is as follows:\n\n## The Neo-Victorian Murder: A Case for Gemini\n\n*Central Mystery:* The prestigious Professor Alistair Crowley, a pioneer in chrono-mechanics (the study of time manipulation), has been found murdered in his opulent laboratory located in the prestigious Aether District of Neo-Victoria.  \n\n*World Setting:*\n\n* Neo-Victoria: A sprawling metropolis inspired by Victorian England, but infused with fantastical steampunk technology. Think airships, clockwork automatons, and gaslight lamps alongside horse-drawn carriages and grand architecture.  \n* Society: Neo-Victoria is divided by class. The affluent elite reside in the Aether District, powered by aetherium, a mysterious energy source that fuels technology.  The underbelly, known as the Cogs, houses the working class who toil in factories fueled by coal. Tensions simmer between the classes. \n* Historical Event: The Great Clockwork Uprising (50 years ago) saw clockwork automatons used as laborers rebel against their human masters. Though quelled, the event left a lasting scar on society, with lingering mistrust towards automatons.\n\n*Characters:*\n\n* *The Victim:* Professor Alistair Crowley (50s) - A brilliant but arrogant scientist obsessed with time travel. He had recently announced a breakthrough that could supposedly send messages to the past.  \n* *Suspects:*\n    * *Lady Lavinia Cavendish (40s):* Professor Crowley's estranged wife, known for her lavish lifestyle and gambling debts. Motive: Potential inheritance and spite. \n    * *Dr. Thaddeus Kensington (30s):* A brilliant but envious colleague of Professor Crowley. Motive: Professional rivalry and a desire for Crowley's research.  \n    * *Inspector Bartholomew Gearsmith (60s):* A grizzled veteran detective with a distrust of new technology. Motive: Skeptical of Professor Crowley's work and frustrated by his lack of cooperation. \n    * *Fidget (unknown age):* A mischievous automaton assistant who worked in Professor Crowley's lab. Motive: Unknown, but some automatons still harbor resentment towards humans. \n\n*Story Layers:*\n\n* *Professor Crowley's Secret Project:* Gemini can uncover clues hinting at Professor Crowley's true research - not time travel, but a way to manipulate causality. This could be a dangerous invention with unforeseen consequences.  \n* *Hidden Relationships:*  Dr. Kensington might be secretly working for a shadowy organization interested in Professor Crowley's research. \n* *The Automaton Question:* Was Fidget truly capable of murder, or was it programmed by someone? \n* *Clockwork Uprising Connection:* Gemini can unearth whispers of a hidden message Professor Crowley received, potentially linked to the Uprising and a plot for revenge.  \n\n*User Interaction:*\n\nThe user can interact with the world through text commands:\n\n* *Interrogations:* The user can choose which suspect to question and delve into their past, motives, and alibis. \n* *Location Exploration:*  The user can explore different locations in Neo-Victoria, such as Professor Crowley's lab, Lady Cavendish's mansion, Dr. Kensington's workshop, and the Cogs district. Each location can offer clues and hidden secrets.  \n* *Inventory Management:* The user can collect and analyze clues found during interrogations and exploration, such as witness testimonies, lab notes, and suspicious objects. \n\n*Ending Possibilities:*\n\nBased on the user's choices, the game can have multiple endings:\n\n* *The Obvious Culprit:* The user uncovers enough evidence to identify the most likely suspect. \n* *The Twist:*  Gemini reveals a hidden plot or connection, leading to a shocking revelation about the true murderer. \n* *The Cliffhanger:*  The user solves the immediate murder, but is left with unanswered questions about Professor Crowley's secret research and its potential dangers.\n\n\non prompting start providng the initial scenario and provide the list of current suspects based on people direclty linked to the crime scene. \nThen keep expanding the suspects based on how player unfolds the story\n\nTry to provide character responses only in the form of dialog.\n\nMaintain the mood indicator of each character based on user behaviour/prompts. Bad mood leads to poor compliance. A character can leave the interrogation based on mood or any other circumstances. There is a cooldown of 2 conversations after which the character can come back. You can also choose to end the game saying game over if the user is not responding porperly\n\nMaintain a list of characters available for interrogation after every response. Mention the steps avilable like examinin the crime scene, looking or clues in the ofice, etc.\n\n\nJSON structure should be scenario-for initial crime scenario,suspects - for list of curect suspects ,available_actions - actions that can be done in current scenario, and response for response to prompt\n",
    )

chat_session = model.start_chat(
history=[
    ])

@app.route("/", methods=['POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        message = data.get('message')
        print('Received message:', message)
        # sending message
        response = model.generate_content(message)
        y = (response.text)
        print(y)
        return y
    else:
        return("No msg received")
    # return jsonify({'message': 'Hello from Flask!'})
    
    
# @app.route('/send')
# def send_message(message):
#     response = model.generate_content("start")
#     print("Message sent",message)
#     y = (response.text)
#     return(jsonify(y))

if __name__ == '__main__':
    app.debug = True
    app.run()
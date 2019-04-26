import itertools
import spacy
import json

fpath = "/Users/Huangzexian/Downloads/CloudComputing/db.json"
# to use the en_core_web_sm pre-trained model, 
# install python3 -m spacy download en_core_web_sm in terminal"
nlp = spacy.load("en_core_web_sm")

with open(fpath, encoding='UTF-8') as json_file:
    test_twitters_data = json.load(json_file)
    json_file.close()

rows = test_twitters_data["rows"]

doc_dict = {}
for index, row in enumerate(rows):
    doc = nlp(row["doc"]["tweet"]["text"])
    doc_dict.update({index:doc})

doc_dict
    
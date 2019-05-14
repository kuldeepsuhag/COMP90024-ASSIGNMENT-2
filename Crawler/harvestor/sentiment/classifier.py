# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710

from textblob import TextBlob
from sentiment import preprocess
import numpy
    
class MyClassifier():
    
    def __init__(self):
        pass
    
    def get_sent_score(self,text):
        proc = preprocess.Preprocess()
        text = proc.process(text)
        blob = TextBlob(text)
        score = blob.sentiment
        polarity = score.polarity
        subjectivity = score.subjectivity
        if polarity > 0:
            label = 'Positive'
        elif polarity == 0:
            #label = 'Neutral'
            label = numpy.random.choice(['Positive','Negative'])
        elif polarity < 0:
            label = 'Negative'
        
        return polarity,subjectivity,label    


       
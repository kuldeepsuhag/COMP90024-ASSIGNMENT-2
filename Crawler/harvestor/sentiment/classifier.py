from textblob import TextBlob
from sentiment import preprocess
import numpy


class Baseline():
    
    def __init__(self):
        pass
    
    def get_sent_score(self,text):
        try:
            text = ' '.join(text)
        except:
            pass
        
        text = TextBlob(text)
        score = text.sentiment
        polarity = score.polarity
        subjectivity = score.subjectivity
        if polarity > 0:
            label = 'Positive'
        elif polarity == 0:
            label = numpy.random.choice(['Positive','Negative'])
            #label = 'Neutral'
        elif polarity < 0:
            label = 'Negative'
        
        return polarity,subjectivity,label
    
    
    
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


       
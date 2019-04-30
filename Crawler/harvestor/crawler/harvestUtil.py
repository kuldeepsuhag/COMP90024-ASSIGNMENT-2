
import tweepy
from sentiment import classifier
from database import database

from crawler.config import db_name
from database.parser import Parser
from crawler.config import app_auth,lust_file,pride_file,sloth_file,envy_file,wrath_file,crime_file
from topic.tagger import Tagger
import re
import time
import sys


def loadTopicFiles(param):
    file = open(param,"r")
    topics = []
    for topic in file:
        topics.append(topic.strip())
    topics = set(topics)
    return topics

def containTopic(topics,text):
    text = [word.replace(",", "").replace(".", "").replace("!","").replace("?","")
     for word in text.split(' ')]

    for word in text:
        if word.lower() in topics:
            return True
    return False
    


def searchById(admin, userid):
    print("start searching "+str(userid)+" timeline")

    #set up
    db = database.DButils()
    cl = classifier.MyClassifier()
    parser = Parser()
    tagger = Tagger()
    user = admin
    auth = tweepy.OAuthHandler(app_auth[user].ckey, app_auth[user].csec)
    auth.set_access_token(app_auth[user].atoken, app_auth[user].asec)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    
    if not api:
        print("Can't Authenticate api key")
        sys.exit(-1)
    
    try:
        query = api.user_timeline(user_id=userid, count=10, lang='en')
    except tweepy.TweepError:
        print("search API access time limited, searching sleeps n back soon ")
        time.sleep(16*60)
        print("crawler back to work")
        return
    for status in query[1:]:
        # filter out retweets
        try:
            if status.retweeted_status:
                return None
        except:
            pass
        
        
        #filter out tweets without interested topics
        topic = tagger.topic_tagger(status.text)
        
        # perform sentiment analysis n store scores to json
        polarity, subjectivity, label = cl.get_sent_score(status.text)
        sent = {
            'polarity':str(polarity), 
            'subjectiviy':str(subjectivity),
            'label':label
        } 
        #parse tweets
        try:
            record = parser.status_parse(status,sent,topic)
        except:
            record = None
            pass
        if record is None:
            return
        if topic is "Bad tweet":
            return
        # save into couchdb
        db.save(db_name,record)        

# setting up stream listener
class MyStreamListener(tweepy.StreamListener):
    def on_error(self, status_code):
        print(status_code)
        if status_code == 420:
            #returning False in on_data disconnects the stream
            print("ERROR: stream connection error")
            return False    

    def on_status(self, status):
        #setup
        db = database.DButils()
        cl = classifier.MyClassifier()
        parser = Parser()
        tagger = Tagger()
        
        # filter out retweets
        try:
            if status.retweeted_status:
                return None
        except:
            pass

        
        #filter out unrelated topics
        topic = tagger.topic_tagger(status.text)

        
        # perform sentiment analysis n store scores to json
        polarity, subjectivity, label = cl.get_sent_score(status.text)
        sent = {
            'polarity':str(polarity), 
            'subjectiviy':str(subjectivity),
            'label':label
        }
        
        #parse tweets
        record = parser.status_parse(status,sent,topic)
        if record is None:
            return
        # save into couchdb
        db.save(db_name,record)
        
        #search tweets from one typical users timeline
        try:
            searchById(sys.argv[1],status.user.id)
        except Exception as e:
            print(e)
            return
        print("finish searching on user: "+str(status.user.id))
        return True
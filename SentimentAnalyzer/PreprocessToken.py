# This program can filter twitter text and split plain text into useful tokens

import pandas as pd
import re
import numpy as np
import json
import spacy
import os

nlp = spacy.load('en')

with open('/Users/duoyizhang/2019-SM2/db.json','r') as f:
    tweet_org=json.load(f)
    f.close()

# select text for each tweet
tweet=[]
for item in tweet_org['rows']:
    if 'doc' in item:
        if 'tweet' in item['doc']:
            if 'text' in item['doc']['tweet']:
                tweet.append(item['doc']['tweet']['text'])

# turn to a pandas dataframe
d = {'text':tweet}
tweet_df = pd.DataFrame(d)

# remove @user tokens
def remove_user(pattern,text):
    r = re.findall(pattern,text )
    for i in r:
        text = re.sub(i, '', text)
    return text
# remove stop words
def removeStop(x):
    doc = nlp(x)
    tokens = [token.text for token in doc if not token.is_stop]
    return tokens
# those two functions are protecting hashtags from spliting. Since nlp can split [#abc] into [#,abc]
def subHash(x):
    return re.sub(r'#(\w)',r'PLACEHOLDER',x)
def resumeHash(text):
  return [x.replace(u'PLACEHOLDER','#') for x in text]

# remove @users
tweet_df['newText']= np.vectorize(remove_user)("@[\w]*",tweet_df['text'])
# remove urls
tweet_df['newText'] = tweet_df['newText'].str.replace(r'https?:\/\/\S*','')
# remove non alpha symbols
# this will remove emojis, ASCII emojis, if you wants to keep those, commenting the command
tweet_df['newText'] = tweet_df['newText'].str.replace("[^a-zA-Z#]",' ')
# split text into tokens
tweet_df['newText'] = tweet_df['newText'].apply(lambda x: subHash(x))
tweet_df['newText'] = tweet_df['newText'].apply(lambda x: removeStop(x) )
tweet_df['newText'] = tweet_df['newText'].apply(lambda x: resumeHash(x) )
print(tweet_df['newText'].head())

tweet_df.to_csv('processedToken.csv')

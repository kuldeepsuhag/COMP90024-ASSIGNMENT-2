# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710


import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import words
import re






def tokenize(text):
    text = text.split()
    return text

def lemmatize(text):
    wordnet_lemmatizer = WordNetLemmatizer()
    #text = [x.lower() for x in text]
    text = [rmRepeatCharacters(x) for x in text]
    #text = [wordnet_lemmatizer.lemmatize(x) for x in text]
    text = [replaceTags(x) for x in text]
    # Fix classic tweet lingo
    text = [text_clean(x) for x in text]   
    return text


def text_clean(text):
    # Fix classic tweet lingo
    text = re.sub(r'\bthats\b', 'that is', text)
    text = re.sub(r'\bive\b', 'i have', text)
    text = re.sub(r'\bim\b', 'i am', text)
    text = re.sub(r'\bya\b', 'yeah', text)
    text = re.sub(r'\bcant\b', 'can not', text)
    text = re.sub(r'\bwont\b', 'will not', text)
    text = re.sub(r'\bid\b', 'i would', text)
    text = re.sub(r'wtf', 'what the fuck', text)
    text = re.sub(r'\bwth\b', 'what the hell', text)
    text = re.sub(r'\br\b', 'are', text)
    text = re.sub(r'\bu\b', 'you', text)
    text = re.sub(r'\bk\b', 'OK', text)
    text = re.sub(r'\bsux\b', 'sucks', text)
    text = re.sub(r'\bno+\b', 'no', text)
    text = re.sub(r'\bcoo+\b', 'cool', text)
    return text
    


def rmRepeatCharacters(word):
    # look for 2 or more repetitions of character and replace with the character itself
    pattern = re.compile(r"(.)\1{1,}", re.DOTALL)
    return pattern.sub(r"\1\1", word)

# replace tags such as mentioned tweeters(@), hashtags(#), URL
def replaceTags(text):
        # Convert www.* or https?://* to URL
    text = re.sub('^((www\.[^\s]+)|(https?://[^\s]+))', '', text)
        # Convert @username to AT_USER
    text = re.sub('^@[^\s]+', '', text)
        # Replace hashtag #word with the word
    text = re.sub(r'^#([^\s]+)', '', text)
        # Remove additional white spaces
    text = re.sub('^[\s]+', ' ', text)
    return text
    


def rmStopword(text,stopwords):
    filtered = []
    for word in text:
        if not stopwords.get(word):
            filtered.append(word)
        
        
    return filtered


def BOW_feature(text):
    bow = []
    for w in text:
        
        # strip puntuations
        bow.append(w)
        
    parsed_text = ' '.join(bow)
    #print(parsed_text)
    return parsed_text
           
    
def stop_word_dict(stopwords):
    """construct a look-up dictionary for stopwords
    and decrease the search complexity to O(1)
    para: stopwords: a list of stopwords
    return: d(stopwords): dictionary format stopwords  
    """
    d = {}
    for word in stopwords:
        d[word] = d.get(word,0) + 1
    return d


    


class Preprocess():
    
    stopwords = stop_word_dict(words.words())
    
    def process(self,text):
        try:
            text = tokenize(text)
        except:
            pass
        
        text = lemmatize(text)
        
        text = rmStopword(text, self.stopwords)
        #print(text)
        
        text = BOW_feature(text)
        return text
    
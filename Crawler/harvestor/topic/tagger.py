from crawler.config import arson, assault, homicide, highblood, highpsy, overweight, sedetary, unemploy
def loadTopicFiles(param):
    file = open(param, "r")
    topics = []
    for topic in file:
        topics.append(topic.strip())
    topics = set(topics)
    return topics


def containTopic(topics, text):
    text = [word.replace(",", "").replace(".", "").replace("!", "").replace("?", "")
            for word in text.split(' ')]

    for word in text:
        if word.lower() in topics:
            return True
    return False

class Tagger():

    def topic_tagger(self,text):
        #print(text)
        topics = loadTopicFiles(arson)  # arson
        if not containTopic(topics, text):
            topics = loadTopicFiles(assault)  # assault
            if not containTopic(topics, text):
                topics = loadTopicFiles(homicide)  # homicide
                if not containTopic(topics, text):
                    topic = loadTopicFiles(highblood) #highblood
                    if not containTopic(topics, text):
                        topic = loadTopicFiles(highpsy) #highpsy
                        if not containTopic(topics, text):
                            topic = loadTopicFiles(overweight) #overweight
                            if not containTopic(topics, text):
                                topic = loadTopicFiles(sedetary) #sedetary
                                if not containTopic(topics, text):
                                    topic = loadTopicFiles(unemploy) #unemploy
                                    if not containTopic(topics, text):
                                        topic = "bad_tweet"
                                    else:
                                        topic = "unemploy"
                                else:
                                    topic = "sedetary"
                            else:
                                topic = "overweight"
                        else:
                            topic = "highpsy"
                    else:
                        topic = "highblood"
                else:
                    topic = "homicide"

            else:
                topic = "assault"
        else:
            topic = "arson"
        return topic

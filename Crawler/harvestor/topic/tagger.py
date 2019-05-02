import re
from crawler.config import envy_file,lust_file,pride_file,sloth_file, wrath_file, gluttony_file


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
        topics = loadTopicFiles(envy_file)  # envy
        if not containTopic(topics, text):
            topics = loadTopicFiles(lust_file)  # lust
            if not containTopic(topics, text):
                topics = loadTopicFiles(pride_file)  # pride
                if not containTopic(topics, text):
                    topics = loadTopicFiles(sloth_file)  # sloth
                    if not containTopic(topics, text):
                        topics = loadTopicFiles(wrath_file)
                        if not containTopic(topics,text):
                            topics = loadTopicFiles(gluttony_file)
                            if not containTopic(topics, text):
                                topic = "Bad tweet"
                            else:
                                topic = "gluttony"
                        else:
                            topic = "wrath"
                    else:

                        topic = "sloth"
                else:
                    topic = "pride"

            else:
                topic = "lust"
        else:
            topic = "envy"
        return topic
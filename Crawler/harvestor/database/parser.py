# team 9
#COMP90024 ASSIGNMENT 2

import json
import re
import time


def in_time_range(now):
    new_now = ''
    for s in now:
        if s != ':':
            new_now += s
    now = new_now
    now = time.strptime(now,"%H%M%S")
    if time.strptime("080000","%H%M%S") <= now <= time.strptime("125959","%H%M%S"):
        timestamp = "morning"
    elif time.strptime("130000","%H%M%S") <= now <=time.strptime("185959","%H%M%S"):
        timestamp = "afternoon"
    elif time.strptime("190000","%H%M%S") <= now <= time.strptime("235959","%H%M%S"):
        timestamp = "evening"
    elif time.strptime("000000","%H%M%S") <= now <= time.strptime("035959","%H%M%S"):
        timestamp = "midnight"
    elif time.strptime("040000","%H%M%S") <= now <= time.strptime("075959","%H%M%S"):
        timestamp = "early morning"
    return timestamp


class Parser():

    def status_parse(self, status, sentiment_score,topic):
        # filt out tweets outside aus
        try:
            if status.place.country_code != 'AU':
                return None
        except AttributeError:
            return None

        hashtag = [part[1:] for part in status.text.split() if part.startswith('#')]
        timestamp = str(status.created_at)
        timestamp = timestamp.split(' ')
        #print(timestamp[1])
        timestamp = in_time_range(timestamp[1])
        #print(timestamp)



        result = {
            "_id": status.id_str,
            "id_str": status.id_str,
            "coordinates": status.coordinates,
            "timestamp":timestamp,
            "place": {
                "place_type": status.place.place_type,
                "name": status.place.name,
                "bounding_box":{"coordinates":status.place.bounding_box.coordinates,
                                "type":status.place.bounding_box.type
                },
                "full_name": status.place.full_name,
                "country_code": status.place.country_code,
                "country": status.place.country
            },
            "user": {
                "id": status.user.id,
                "id_str": status.user.id_str,
                "name": status.user.name,
                "description": status.user.description
            },
            "lang": status.lang,
            "text": status.text,
            "sentiment": sentiment_score,
            "topic":topic,
            "hashtag":hashtag
        }
        return result

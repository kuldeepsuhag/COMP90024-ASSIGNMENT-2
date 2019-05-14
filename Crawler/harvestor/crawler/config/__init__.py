# team 9
#COMP90024 ASSIGNMENT 2

class Keys:
    """
        CONSUMER_KEY
        CONSUMER_SEC
        ACCESS_TOKEN
        ACCESS_SEC
    """

    def __init__(self, ckey, csec, atoken, asec):
        self.ckey = ckey
        self.csec = csec
        self.atoken = atoken
        self.asec = asec



# couchdb
db_name = 'tweets'
db_admin = 'admin'
db_password = 'admin'
couchdb_uri = "http://127.0.0.1:5984"


# twitter api
app_auth = {
    'HongtaoN': Keys(
        "xy3M4v47HoS3ReS3X47UedgdB",
        "R1sl6MY0TdtrBIPVmQ70CfjTj5bMocNbKmuQXsdfEKJgneNjMW",
        "1019729563574624256-kdoFtpCj9P72zcy9SCyU1xLocjfeKW",
        "nDqhbC8Ofcn63GSUdsBnJdb0BbS45Aku78P70cfdhVBxT"
    ),
    'kuldeep': Keys(
        "c67rYQVxBfyQAqrN9oMes59PB",
        "ougb9ujqYgT1AJ1VtcsjVvpjfKTkqj0IljTrcgZBTp4kgbDw4M",
        "981533044522627072-YFGoc8FBwK6pqOXc5teJhFnPcu3ghtg",
        "yXc72kyxq8F5EqtDacD1Kdneddm1XnfS1u57uS3tVyBmx"
    ),
    'duoyi': Keys(
        "r60lmHFCfE7qQ3RH5IFP0nwYj",
        "JjB7VNHxM9gjoHDD4r4DJQxqcnhZ70p9BCELCJAgM7Xa0HXSv4",
        "976598832321519616-CaBhQMefcmSeUHCoOK2Gc27OClibqU3",
        "ECVXpPGbCiH9a3crKrkYHzN71kiFSPW9lLZA4WAPxu2dK"
    ),
    'zexian': Keys(
        "T0KTwhENFNP6g3EuWxNW6fTZV",
        "16L9zDUW0bpZpBqnaAviBQSlvKX8VKky0C31sJyK6voUiX2ANm",
        "1123858584759087106-SThx2lsrGXXNShAPxG5M9WG9m3I3S1",
        "oxfBYJtDb3t01rkX8TMX2A4lBj700pd9KV3AADafx0Wtn"
        
        
    )

}
MELBOURNE_STR = [144.6550006954,-38.5089967291,145.3498310249,-37.5916213868]  #http://boundingbox.klokantech.com



           
# topics
# arson = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/arson.txt"
# assault = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/assault.txt"
# homicide = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/Homicide.txt"
# highblood = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/highblood.txt"
# highpsy = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/highpsy.txt"
# overweight = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/overweight.txt"
# sedetary = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/sedetary.txt"
# unemploy = "/home/ubuntu/COMP90024-ASSIGNMENT-2/Crawler/harvestor/topic/topic_glossary/unemployment.txt"
arson = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/arson.txt"
assault = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/assault.txt"
homicide = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/Homicide.txt"
highblood = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/highblood.txt"
highpsy = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/highpsy.txt"
overweight = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/overweight.txt"
sedetary = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/sedetary.txt"
unemploy = "/Users/kuldeepsuhag/Downloads/Crawler/harvestor/topic/topic_glossary/unemployment.txt"

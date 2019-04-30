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
db_name = 'testing'
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
    )

}
MELBOURNE_STR = [144.6550006954,-38.5089967291,145.3498310249,-37.5916213868]  #http://boundingbox.klokantech.com
SYD_STR = [150.9786666445,-34.0173030936,151.3082564883,-33.7048428499]

AUS_STR = MELBOURNE_STR+SYD_STR

           
# topics
envy_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/envy.txt"
lust_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/lust.txt"
pride_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/pride.txt"
sloth_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/sloth.txt"
wrath_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/wrath"
crime_file = "/Users/kuldeepsuhag/Desktop/Cloud Computiing/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/analyser/topic/topic_glossary/crime.txt"


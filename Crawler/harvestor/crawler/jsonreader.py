# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710

from database.parser import Parser



instagram_file_name = " /Users/kuldeepsuhag/Desktop/Assignment2/COMP90024-ASSIGNMENT-2/Crawler/harvestor/instagram.json"


with open(instagram_file_name, encoding="utf8") as f:
    cnt = 0
    for line in f:
        try:
            data = json.loads(line[0:len(line) - 2])
            #print(data)
            Parser(data)

        except:
            try:
                data = json.loads(line[0:len(line) - 1])
                #print(data)
                Parser(data)
            except:
                continue


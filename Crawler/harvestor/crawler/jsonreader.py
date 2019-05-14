#team 9
#COMP90024 ASSIGNMENT 2

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


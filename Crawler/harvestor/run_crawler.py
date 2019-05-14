# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710

from crawler.harvest import HarvestSys


def run_crawler(crawler):
    crawler.harvest()


if __name__ == '__main__':
    crawler = HarvestSys()
    run_crawler(crawler)
    
  
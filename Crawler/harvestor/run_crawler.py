from crawler.harvest import HarvestSys


def run_crawler(crawler):
    crawler.harvest()


if __name__ == '__main__':
    crawler = HarvestSys()
    run_crawler(crawler)
    
  
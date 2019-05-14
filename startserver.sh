# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710

#!/bin/bash
cd /home/ubuntu/public/javascripts/;

rm ipAddress.txt;
touch ipAddress.txt;
echo $DOCKER_HOST >> ipAddress.txt;

cd /home/ubuntu/;

nohup npm start 'daemon off';

cd /home/ubuntu/public/javascripts;
chmod 777 run.sh;
./run.sh 'daemon off';
echo '*/10 * * * * /home/ubuntu/public/javascript/run.sh' >>  /var/spoolcron/crontab/ubuntu;

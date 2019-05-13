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

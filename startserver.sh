#!/bin/bash

cd /home/ubuntu/;

nohup npm start 'daemon off';

cd /home/ubuntu/public/javascripts;
chmod 777 run.sh;
./run.sh 'daemon off';

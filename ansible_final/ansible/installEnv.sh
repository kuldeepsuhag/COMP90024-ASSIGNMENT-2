#!/bin/bash
 . ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/team9.txt --ask-become-pass setEnv.yaml
#team 9
#COMP90024 ASSIGNMENT 2
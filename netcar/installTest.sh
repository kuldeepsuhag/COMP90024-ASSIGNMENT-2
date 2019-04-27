#!/bin/bash
 . ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/key.txt --ask-become-pass setEnv.yaml

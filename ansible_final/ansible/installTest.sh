 #!/bin/bash
  . ./openrc-demo.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/key.txt --ask-become-pass setEnv.yaml
  sh ./configure_cluster.sh

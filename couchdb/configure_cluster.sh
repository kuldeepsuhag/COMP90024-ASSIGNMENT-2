#!/usr/bin/env bash

echo "== Set variables =="
declare -a nodes=(172.26.38.99 172.26.38.64 172.26.37.220 172.26.38.68)
export master_node=172.26.38.99
export master_port=5984
export size=${#nodes[@]}
export user=admin
export pass=admin
export uuid="926c80513ee08d47321a410f9c00047d"
export secret="926c80513ee08d47321a410f9c000a84"


echo "==preparing coudhdb nodes to be joined into a cluster=="

echo "==  Create the admin user and password =="
curl -X PUT http://${user}:${pass}@${master_node}:5984/_node/_local/_config/admins/admin -d '"admin"'

echo "== bind the clustered interface to all IP addresses availble on this machine =="
for (( i=0; i<${size}; i++ )); do
  curl -X PUT http://${user}:${pass}@{nodes[${i}]}:5984/_node/_local/_config/chttpd/bind_address -d '"0.0.0.0"'
done

echo "== Set the UUID of the node to the first UUID you previously obtained =="
for (( i = 0; i <${size}; i++ )); do
	curl -X PUT http://${user}:${pass}@${nodes[${i}]}:5984/_node/_local/_config/couchdb/uuid -d '${uuid}'
	curl -X PUT http://${user}:${pass}@${nodes[${i}]}:5984/_node/_local/_config/couch_httpd_auth/secret -d '${secret}'

done




echo "== Enable cluster setup =="
for (( i=0; i<${size}; i++ )); do
  curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@{nodes[${i}]}:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "${user}", "password":"${pass}", "node_count":"${size}"}'
done




echo "== Add nodes to cluster =="
for (( i=0; i<${size}; i++ )); do
  if [ "${nodes[${i}]}" != "${master_node}" ]; then
    curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@{master_node}:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "${user}", "password":"${pass}", "port": 5984, "node_count": "${size}", "remote_node": "${nodes[${i}]}", "remote_current_user": "${user}", "remote_current_password": "${pass}" }'
	curl -X POST -H "Content-Type: application/json" http://${user}:${pass}@{master_node}:5984/_cluster_setup -d '{"action": "add_node", "host":"${nodes[${i}]}", "port": 5984, "username": "${user}", "password":"${pass}"}'
  fi
done



curl -X POST  -H 'Content-Type: application/json' http://${user}:${pass}@${master_node}:5984/_cluster_setup -d '{"action": "finish_cluster"}'

curl http://${user}:${pass}@${master_node}:5984/_cluster_setup

curl -X GET http://${user}:${pass}@${master_node}:5984/_membership; done

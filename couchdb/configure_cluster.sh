#!/usr/bin/env bash
#team9 - script for setting up cluster
echo "== Set variables =="
declare -a nodes=(103.6.254.144 103.6.254.102)
export master_node=103.6.254.144
export size=${#nodes[@]}


echo "==preparing coudhdb nodes to be joined into a cluster=="

echo "==  Create the admin user and password =="
curl -X PUT http://admin:admin@${master_node}:5984/_node/_local/_config/admins/admin -d '"admin"'

echo "== bind the clustered interface to all IP addresses availble on this machine =="
for (( i=0; i<${size}; i++ )); do
  curl -X PUT http://admin:admin@${nodes[${i}]}:5984/_node/_local/_config/chttpd/bind_address -d '"0.0.0.0"'
done

echo "== Set the UUID of the node to the first UUID you previously obtained =="
for (( i = 0; i <${size}; i++ )); do
	curl -X PUT http://admin:admin@${nodes[${i}]}:5984/_node/_local/_config/couchdb/uuid -d '"926c80513ee08d47321a410f9c00047d"'
	curl -X PUT http://admin:admin@${nodes[${i}]}:5984/_node/_local/_config/couch_httpd_auth/secret -d '"926c80513ee08d47321a410f9c000a84"'

done

echo "====== heriwirier   ${nodes[1]} ========"


echo "== Enable cluster setup =="
for (( i=0; i<${size}; i++ )); do
  curl -X POST -H "Content-Type: application/json" http://admin:admin@${nodes[${i}]}:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "admin", "password":"admin", "node_count":"${size}"}'
done




# curl -X POST -H "Content-Type: application/json" http://admin:admin@103.6.254.144:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "admin", "password":"password", "port": 5984, "node_count": "2", "remote_node": "103.6.254.102", "remote_current_user": "admin", "remote_current_password": "admin" }'
# curl -X POST -H "Content-Type: application/json" http://admin:admin@103.6.254.144:5984/_cluster_setup -d '{"action": "add_node", "host":"103.6.254.102", "port":5984, "username": "admin", "password":"admin"}'
echo "== Add nodes to cluster =="
for (( i=0; i<${size}; i++ )); do
  if [ "${nodes[i]}" != "${master_node}" ]; then
    curl -X POST -H "Content-Type: application/json" http://admin:admin@${master_node}:5984/_cluster_setup -d '{"action": "enable_cluster", "bind_address":"0.0.0.0", "username": "admin", "password":"admin", "port": 5984, "node_count": "${size}", "remote_node": "${nodes[i]}", "remote_current_user": "admin", "remote_current_password": "admin" }'
	
  fi
done

echo "== Add nodes to cluster =="
for (( i=0; i<${size}; i++ )); do
  if [ "${nodes[i]}" != "${master_node}" ]; then
    echo "${nodes[i]}"
    echo "$i"
    curl -X POST -H 'Content-Type: application/json' http://admin:admin@${master_node}:5984/_cluster_setup \
      -d "{\"action\": \"add_node\", \"host\":\"${nodes[${i}]}\", \"port\": 5984, \"username\": \"admin\", \"password\":\"admin\"}"

  fi
done

 curl -X POST  -H 'Content-Type: application/json' http://admin:admin@${master_node}:5984/_cluster_setup -d '{"action": "finish_cluster"}'

 curl http://admin:admin@${master_node}:5984/_cluster_setup

 curl -X GET http://admin:admin@${master_node}:5984/_membership

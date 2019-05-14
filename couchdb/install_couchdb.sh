# Team: team 9
# City: Melbourne Australia
# Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
# Member 1: Naiyun Wu - 1008438
# Member 2: Kuldeep Suhag - 919397
# Member 3: Hongtao Ni - 938737
# Member 4: Duoyi Zhang - 956812
# Member 5: Zexian Huang - 1012710

# script for installing couchdb with cluster setting
echo "====== getting ip ======"
NODENAME=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo "nodename couchdb@{$NODENAME}"

# Update cache.
sudo apt-get update

# Set the password variable.
echo "== setting password for couchdb ===="
COUCHDB_PASSWORD=admin

# Bindaddress: 0.0.0.0 (does not bind to anything).
echo "== Setting up cluster variable for couch =="
echo "couchdb couchdb/mode select clustered
couchdb couchdb/nodename string couchdb@${NODENAME}
couchdb couchdb/bindaddress string 0.0.0.0
couchdb couchdb/adminpass password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again seen true" | sudo debconf-set-selections

# We enter non-interactive mode instead of interactive mode here.
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y couchdb
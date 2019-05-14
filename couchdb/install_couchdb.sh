#team 9 script for installing couchdb with cluster setting
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
COMP90024 Assignment 2
===
-
**This repository is for assignment 2 of COMP90024. The whole project is divided into four parts: Crawler, Web server, Application server and couchdb database. The whole working direcory is shown as below:**
.<br>
├──AURIN\Datasets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*// This folder holds all aurin data*<br>
├── Crawler&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *// Includes all codes related to sentiments and crawler*<br>
├── ServerDockerFile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *// All scripts to create and upload image to docker hub*<br>
├── _config.yml <br>
├── ansible &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *// Old version of ansible codes*<br>
├── ansible\_final &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *// Final version of ansible code*<br>
├── ccc\_demo\_0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*// Includes all files for both web server an application server*<br>
├── couchdb &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*// Include the script to set up the couch db and couchdb cluster*<br>
├── keys &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*// Twitter tokens of group members*<br>
└── startserver.sh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*// Scripts used by docker to create servers.*<br>

Automation
--
* Ansible is used to do the automation work, the whole working directory is shown as below:<br>
├── host\_vars	<br>
│   ├── nectar.yaml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Defined variables for Nectar<br>
│   └── setSwarm.yml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Defined variables for swarm<br>
├── hosts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Hosts that playbook accesses<br>
├── roles&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Includes all roles<br>
│   ├── buildImage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Build docker service image<br>
│   ├── createService&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Create service for swarm leader<br>
│   ├── copyFromGit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Copy files from github<br>
│   ├── initFirstManager&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Create swarm leader<br>
│   ├── joinAsManager&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Join swarm as a manager<br>
│   ├── joinSwarm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Join swarm as a worker<br>
│   ├── openstack-common&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Install dependencies to run openstack<br>
│   ├── openstack-images&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Grab images from openstack API<br>
│   ├── openstack-instance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Create instances for Nectar<br>
│   ├── openstack-security-group&nbsp;&nbsp;&nbsp;// Create security groups<br>
│   ├── openstack-volume&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Create volumes<br>
│   ├── setDockerEnv&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Setup docker configuration<br>
│   ├── setEnvironment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Setup environment for instances<br>
│   └── updateService&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Update service in the future<br>
├── openrc.sh	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Interact with openstack API<br>
├── runIns.sh	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//Launch instances<br>
├── installEnv.sh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Install software<br>
├── runDocker.sh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Deploy swarm<br>
├── configure_cluster.sh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Set configurations for couchdb<br>
├── install_couchdb.sh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Install couchdb<br>
├── nectar.yaml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// The playbook for setup instances<br>
├── setEnv.yaml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// The playbook for setup environment<br>
├── setSwarm.yml	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// The playbook for setup swarm<br>
└── updateSer.yml&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// The playbook for update service<br>

Set up instances and environments
--
* Download the whole repository into your laptop by the following commands:
```
git clone https://github.com/kuldeepsuhag/COMP90024-ASSIGNMENT-2.git
```
* Enter the ```./ansible_final/ansible``` folder using ``` cd ansible_final/ansible/```<br>
* Paste your own ```openrc.sh``` under the folder shown above.
* Then, run ```runIns.sh``` to set up the instance using:<br>
```
sudo sh ./runIns.sh
``` <br>If you want to set up multiple instances, just change the variables under *host_var* directory and run the same command again.
* To set up the software environment, first you have to copy all ips of your instances and paste them into the ```./ansible/hosts```
file. Also paste them into the ```configure_cluster.sh```Then, run the following command:<br>
```
sudo sh ./installTest.sh
```<br>
The program will help you set up all environment and build a cluster for couchdb based on provided ip addresses. You can check the cluster by entering ```http://your_ip_address:5984/_membership``` in the browser.
* After that, before starting the crawler, you have to log into the master node and install nltk dataset to make sure there will be no errors while crawlering:<br>
```
python3
>>> import nltk
>>> nltk.download('words')
```<br>
Then 
```python3 ./Crawler/harvestor/run_crawler.py your_twitter_token``` <br>
to start the crawler. The crawler will start collect data throught your twitter token. Also the following tasks will be complete simultaneously:<br>
- **Sentiment analysis**: it will first uniform the string and classify them into three types: Postitive, Negative and Netural.<br>
- **Topic parsing**: it will allocate tweets into different topics (E.g. wrath, sloth, arson).<br>
- **Time Point Partition**: partition 24 hours into five time slot named such as, 12:00am to 03:59am (midnight), 04:00 am to 07:59am (early morning) etc.<br>
- **Process Instagram data**: collected the data from Instagram, and process them just like twitter data.<br>


Set up docker swarm
--
* Under the host_vars directory, in the setSwarm.yml, one must set each docker-swarm node's ip address as follows:<br>
*docker-swarm-1 ansible\_ssh\_host=172.26.38.*<br>
*docker-swarm-2 ansible\_ssh\_host=172.26.38.*<br>
*docker-swarm-3 ansible\_ssh\_host=172.26.37.*<br>
*docker-swarm-4 ansible\_ssh\_host=172.26.38.*<br>
* Then in the host file in the root ANSIBLE directory, one should define one leader:<br>
*[leader]*<br>
*docker-swarm-1*<br>
* An odd number of managers(including the leader):<br>
*[managers]*<br>
*docker-swarm-2*<br>
*docker-swarm-3*<br>
* And set the rest of the nodes in the swarm under the worker host group.<br>
*[workers]*<br>
*docker-swarm-4*<br>
* Before running the run in the runDocker.sh, one must add the configuration to ```~/.ssh/config``` file to allow a git clone through the proxy.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Host github.com*<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Hostname ssh.github.com*<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Port 443*<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*User git*<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*ProxyCommand nc -X connect -x wwwproxy.unimelb.edu.au:8000 %h %p*<br>
as well as generating and adding the ssh key of the instance to the github repository.<br>
Then by executing ```runDocker.sh```, the ansible script ```setSwarm.yml``` automatically clones/pulls from git, builds the image, pushes it to docker hub and starts the service with that image that was just pushed.<br>
After doing all processes above, you can check the web page by enter in anyone of the ip addresses defined as ```ansible_ssh_host```.




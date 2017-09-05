#!/bin/bash
# Script to set up meteor in a way that doesn't upset Mongo

# Explicitly change user so meteor doesn't complain you're working as root
sudo -u ubuntu -H bash << EOF

# Initialise .meteor dir in home dir then mount in synced folder
meteor create ~/app
meteor create /vagrant/app
rm -rf /vagrant/app/.meteor 
mkdir /vagrant/app/.meteor/

# Mount .meteor from home dir in synced folder
sudo mount --bind ~/app/.meteor/ /vagrant/app/.meteor

EOF
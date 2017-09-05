#!/bin/bash
# Script to build and run meteor

# Explicitly change user so meteor doesn't complain you're working as root
sudo -u ubuntu -H bash << EOF

cd /vagrant/app && meteor

EOF
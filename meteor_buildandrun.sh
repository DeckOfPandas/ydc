#!/bin/bash
# Script to build and run meteor

# Explicitly change user so meteor doesn't complain you're working as root
sudo -u ubuntu -H bash << EOF

# Be in correct folder
cd /vagrant/src

# Build
meteor build --debug --directory ../_build

# Run
meteor run

EOF

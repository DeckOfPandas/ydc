#!/bin/bash
# Script to set up meteor in a way that doesn't upset Mongo

# Explicitly change user so meteor doesn't complain you're working as root
sudo -u ubuntu -H bash << EOF

# Initialise clean meteors
rm -rf ~/temp_meteor
meteor create ~/temp_meteor
rm -rf /vagrant/src/.meteor 
mkdir /vagrant/src/.meteor

# Mount .meteor from home dir to synced folder
sudo mount --bind ~/temp_meteor/.meteor/ /vagrant/src/.meteor

# Be in correct folder
cd /vagrant/src

# Install required npm packages
#meteor npm install

# Add required meteor packages
meteor add accounts-password@=1.4.0
meteor add alanning:roles@=1.2.16
meteor add aldeed:geocoder@=0.3.8
meteor add aldeed:simple-schema@=1.5.3
meteor add blaze-html-templates@=1.1.2
meteor add dburles:google-maps@=1.1.5
meteor add ecmascript@=0.8.1
meteor add email@=1.2.3
meteor add force-ssl@=1.0.14
meteor add ian:accounts-ui-bootstrap-3@=1.2.89
meteor add insecure@=1.0.7
meteor add iron:router@=1.1.2
meteor add matb33:collection-hooks@=0.8.4
meteor add mdg:validated-method@=1.1.0
meteor add meteor-base@=1.1.0
meteor add mobile-experience@=1.0.4
meteor add momentjs:moment@=2.18.1
meteor add mongo@=1.1.19
meteor add ostrio:files@=1.8.0
meteor add ostrio:meteor-root@=1.0.6
meteor add peppelg:bootstrap-3-modal@=1.0.4
meteor add reactive-dict@=1.1.9
meteor add reactive-var@=1.0.11
meteor add session@=1.1.7
meteor add shell-server@=0.2.4
meteor add standard-minifier-css@=1.3.4
meteor add standard-minifier-js@=2.1.1
meteor add tracker@=1.1.3
meteor add tsega:bootstrap3-datetimepicker@=4.17.37_1
meteor add twbs:bootstrap@=3.3.6

EOF


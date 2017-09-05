# Young Diabetes Connections

## Description
YDC is a Meteor webapp for children and young people with diabetes, and their families.

## Development and deployment

### Local development
The source code is in /src, and can be built via vagrant:

* Fork and clone this project, e.g.:  
`git clone https://github.com/DeckOfPandas/ydc`

* Run vagrant:  
`vagrant up`

* The webapp can be accessed via [http://localhost:4567/](http://localhost:4567/)

All required npm and meteor packages will be automagically installed the first time you vagrant up. After that, if you delete the src/.meteor dir you will need to exit vagrant, replace 'once' with 'always' in line 24 of the Vagrantfile, then vagrant up again to reinstall the dependencies.

If stuck:
* `rm -rf src/.meteor` then as above
* Panic?

### Deployment
Heroku  
Details to follow


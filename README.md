# City Event Hub
<sup>Starting Node/Express/Angular seed at [erikdonohoo/angular-express-seed](https://github.com/erikdonohoo/angular-express-seed)</sup>

Description here

## Getting Started
#### First setup the enviroment:

sudo su  
> echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list  
> wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add -  
> add-apt-repository ppa:chris-lea/node.js  
> apt-get update  
> apt-get install heroku-toolbelt nodejs  
> exit  

#### Getting the code and configuring it:
  
cd repo_directory  
git clone git@github.com:CityEventHub/city-event-hub.git  
cd city-event-hub/  
git remote add heroku git@heroku.com:city-event-hub.git  
heroku login  
heroku plugins:install git://github.com/ddollar/heroku-config.git  
heroku config:pull  
sudo npm install  
foreman start

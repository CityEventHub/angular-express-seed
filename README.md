# City Event Hub
<sup>Starting Node/Express/Angular seed at [erikdonohoo/angular-express-seed](https://github.com/erikdonohoo/angular-express-seed)</sup>

Description here

## Getting Started
#### First setup the enviroment:

sudo su  
> echo "deb https://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list  
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


## [LESS](http://lesscss.org/) (optional)
#### About:
Note: Using Less is optional. Instead you can just create a css file for the page in the public/css/ directory and reference that stylesheet in index.html, however the ease of Less makes it a great tool in speeding up css development.

LESS is a CSS simplifier. It suports variables, mixins, operations, and functions. It also supports nested selectors for greater control, and major simplification.  Less is compiled into CSS that can be minified.  After every edit Less must be compiled for the changes to update.  You can compile it by this command `lessc less/less.less > public/css/less.css, however that gets tedious after a while.  

Instead we can use Less2Css package plugin for Sublime.  Every time you save it does a quick scan and compiles less without you needing to do anything.  To install, add the [Sublime Package Manager](https://sublime.wbond.net/installation) to sublime. After restarting sublime install Less2Css by using Ctrl+Shift+P, type "install" and hit enter, then type "Less2Css" and hit enter.  

This is the configuration I'm using for the Less2Css plugin. It should go in Preferences->Package Settings->Less2Css->Settings - User:
> {  
>   "lesscCommand": false,  
>   "lessBaseDir": "./less",  
>   "outputDir": "./public/css",  
>   "outputFile": "less.css",  
>   "minify": true,  
>   "autoCompile": true,  
>   "showErrorWithWindow": true,  
>   "main_file": "less.less",  
>   "ignorePrefixedFiles": false  
> }  

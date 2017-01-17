# [Good Eats] (https://goodeats-md.herokuapp.com)
![Uploading goodeats-homepage.png…](http://i.imgur.com/7JnGsG2.png)
[Good Eats] (https://goodeats-md.herokuapp.com) allows us to share the foods that are good for our bodies and our well-being. It is a means to help us discover healthy meals in new places, as well as old favorites. It's the food you'll want to share... 
## FrontEnd
* [AngularJS] (https://angularjs.org/)
* [Bootstrap] (https://getbootstrap.com/)
* [SASS] (http://sass-lang.com/)
* [jQuery] (http://jquery.com/)

## BackEnd
* [NodeJS] (https://nodejs.org/en/)
* [MongoDB] (https://www.mongodb.com/)

## Development
1. To build onto this application, fork or download the app directory.
2. Review the ```package.json``` file. 
``` javascript
"dependencies": {
    "angular": "^1.6.0",
    "angular-ui-router": "^0.3.2",
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "http-server": "^0.9.0",
    "jquery": "^3.1.1",
    "mongodb": "^2.2.16",
    "oauth": "^0.9.15",
    "sass": "^0.5.0"
  },
  ```
  
    * Once file has been reviewed, launch terminal and install npm init within the project root directory. 
    * Upon successful installation, a ```node_modules``` folder will appear in the project directory.
3. Review the ```gruntfile.js``` file. Running ```grunt watch``` will clean the current build directory and create a new build  each time a file is saved. 

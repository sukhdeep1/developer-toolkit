# Developer Toolkit

This application will allow developers to launch corespring items and get the source code that was used to launch the item.

See: [this mockup](https://www.easel.io/documents/f815298729882407?mode=preview#f815298729882407)

## Building (TODO: automate this)

We assume you have node installed
    
    #install bower
    npm install bower -g
    #install grunt
    npm install grunt -g
    #install this app's dependencies
    npm install
    #install the bower packages
    cd client
    bower install
    #run grunt - you'll only need to do this if you've updated the frontend dependencies
    grunt
    #run the server
    node app.js
    
    

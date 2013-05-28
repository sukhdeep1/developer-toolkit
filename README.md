# Developer Toolkit

This application will allow developers to launch corespring items and get the source code that was used to launch the item.

See: [this mockup](https://www.easel.io/documents/f815298729882407?mode=preview#f815298729882407)


## Building

We assume you have node/npm & bower installed
    
    npm install
    ./prepublish
    node app.js
    
## Pointing the app to corespring.org

You'll need to specify the corespring url as an env var.

    export CORESPRING_URL="https://corespring.org"
    

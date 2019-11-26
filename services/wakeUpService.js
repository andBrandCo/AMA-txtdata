var https = require('https');
setInterval(function() {
    https.get(process.env.REACT_APP_URL);
    
}, 300000); // every 5 minutes (300000)
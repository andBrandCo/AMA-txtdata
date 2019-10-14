var https = require('https');
setInterval(function() {
    https.get("https://ama-txt.herokuapp.com/");
    
}, 300000); // every 5 minutes (300000)
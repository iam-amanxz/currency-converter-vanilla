var request = require('request');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/weather", (req, res) => {
    
      
        const uri = "https://currency-exchange.p.rapidapi.com/exchange?",
        headers={
        'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        'x-rapidapi-key': 'b13c4f3d67msh8143a7f1298de7bp1e8586jsn4453f885a4e7'
        }
        const queryObject  = {
            q: 1,
            from: 'USD',
            to: 'LKR'
            };
        
        console.log(queryObject)
        request({
           url:uri,
           qs:queryObject,
           headers: headers
        },
    function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.json({'body': body}); // Print JSON response.
        }
        })
});

app.listen(port, () => {
console.log("Server is running on port " + port);
});
var express = require('express');
var app = express();
var twitterAPI = require('node-twitter-api');
var accessToken = '1197192116847419397-DPATV3hpGN1D2vcct4HnlCzqwIDTh8';
var accessTokenSecret = 'N3b6wSVOl4Vkhb8ZMXm8H9YKSa9o3G7ogDWABqujqFeYy';
var twitter = new twitterAPI({
    consumerKey: 'pdTmQaNsnLKXqhQCGCPgeRMvc',
    consumerSecret: 'w64QhUgCL5CQK51lIXfHAAv8rF6WPrXeJHqZtUP9jjjVaAxQE1',
    //callback: 'http://yoururl.tld/something'
});

const fetch = require("node-fetch");

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/update', function(req, res) {
        fetch("https://api.thingspeak.com/channels/899252/feeds.json?results=1").then(response => {
        response.json().then(data => {
          console.log(data)
          let field1 = new Array();
          let field2 = new Array();
          let field3 = new Array();
          let field4 = new Array();
          data.feeds.forEach((item) => {
              console.log(item);
              let field1_data = item.field1;
              let field2_data = item.field2;
              let field3_data = item.field3;
              let field4_data = item.field4;
              field1.push(field1_data);
              field2.push(field2_data);
              field3.push(field3_data);
              field4.push(field4_data);
          })

          if(  field3[0] > 3 ){
            twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
                if (error) {
                    console.log("Error getting OAuth request token : " + error);
                } else {
                    
                }
            });
            console.log("Postando Twitter");
            twitter.statuses("update", {
                status: "Aviso!! Vazamento de Gás!!"
                              .concat("\n Umidade: ")
                              .concat(field2[0])
                              .concat("\nTemperatura: ")
                              .concat(field1[0])
                              .concat("\nGas :")
                              .concat(field3[0])
                              .concat("\nChuva: ")
                              .concat(field4[0])
                              .concat("\nkey: ")
                              .concat(Math.random()),
                },
            accessToken,
            accessTokenSecret,
            function(error, data, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("OK");
                    }
                }
            );
            
        }
        else{
            console.log("Nothing");
        }
        })
      })
    

   

    
});
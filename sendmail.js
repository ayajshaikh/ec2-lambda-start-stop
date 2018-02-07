var AWS = require('aws-sdk');

module.exports = (event, instanceId) => {
    // Create SES service object
    ses = new AWS.SES({apiVersion: '2016-11-15'});

    var eParams = {
        Destination: {
            ToAddresses: ["<TO EMAIL ADDRESS>"]
        },
        Message: {
            Body: {
                Text: {
                    Data: event + " Instance " +instanceId
                }
            },
            Subject: {
                Data: event + " Instance " +instanceId
            }
        },
        Source: "<SOURCE EMAIL ID>"
    };
    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
        }
    });
  
};

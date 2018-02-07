var AWS = require('aws-sdk');
var sendmail = require('./sendmail');

module.exports = (instanceId) => {
    // Create EC2 service object
    ec2 = new AWS.EC2({apiVersion: '2016-11-15'});


    var params = {
        InstanceIds: [instanceId],
        DryRun: true
    };
    
// call EC2 to stop the selected instances
    ec2.stopInstances(params, function(err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.stopInstances(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    sendmail("STOP ", params.InstanceIds)
                    console.log("Success", data.StoppingInstances);
                }
            });
        } else {
            console.log("You don't have permission to stop instances");
        }
  });
};

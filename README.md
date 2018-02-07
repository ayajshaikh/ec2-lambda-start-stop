# ec2-lambda-start-stop
AWS Lambda to start and stop the EC2 instances

1. Create a Node.js Lamnda Function say "ec2-lambda-start-stop"
2. Policy required:
```Json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail",
                "ec2:Start*",
                "ec2:Stop*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
```
3. Create a Rule in CloudWatch
4. Select Event Source as Schedule
5. Add the cron expression. [Learn more](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html) about CloudWatch Events schedules.
6. Add Target as Lambda function select your function "ec2-lambda-start-stop"; select config input as Constant (JSON Text)
   Add the Json in following format
   ```Json
   {
        "instances": ["<instance-id>"],
        "action": "start"
   }
   ```
7. Action Values:

| Action        | Value    |
| ------------- |:--------:|
| Statup        | start    |
| Shutdown      | stop     |

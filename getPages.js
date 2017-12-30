"use strict";
import AWS from "aws-sdk";
const crawlService = require("./services/crawlService");

AWS.config.update({region: "ap-southeast-1"});
export function main(event, context, callback) {
    const reqBody = JSON.parse(event.body);

    crawlService.crawl(reqBody.urls).then(result => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(result),
        };
        callback(null, response);
    }, error => {
        callback(error);
    });

}
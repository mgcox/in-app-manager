'use strict';
var AWS = require('aws-sdk'),
documentClient = new AWS.DynamoDB.DocumentClient(); 


function writeEventToDB(event, body, callback){
	//console.log(body)

	//let latest = JSON.parse(event.body.latest_receipt_info)

	//let latest = JSON.parse(body.latest_receipt_info)
	// console.log(latest)
	// console.log(latest.original_transaction_id)
  	var params = {
		Item : {
			"id" : "4523",
			"body" : event.body,
			"JSON" : event 
			"latest_receipt" : event.body.latest_receipt
		},
		TableName: "in-app-manager-dev"
	};

	documentClient.put(params, function(err, data){
		console.log(err)
		callback(err, data);

	});

}



module.exports.notify =  async (event, context, callback) => {

 	if (event.body !== null && event.body !== undefined) {
	    let body = JSON.parse(event.body)


	    //let type = body.event.type;

	    //Check event charge type
	    // if(type == "charge:created"){
	    // 	//Send Email
		   //  if (body.event.data.metadata.email){
		   //  		console.log('---------------------------------');
					// console.log('Email', body.event.data.metadata.email);
		   //  } 

		writeEventToDB(event, body, callback);
	    // }  
	}	



  console.log(event)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "succesfully received notifcation",
      context: context
    }),
  };

  return callback(null, response);
};

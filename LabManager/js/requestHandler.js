
var para_process = require('child_process');
var fs = require('fs');
var querystring = require('querystring');
var ejs = require('ejs');
var mutex = 0;

function base_handler(response,Data,dbcon)
{
	console.log("Base Handler called");
	// our first non blocking operation with a callback function
	fs.readFile('./../html/index.html', function(err, data) {
    									response.writeHead(200, {'Content-Type': 'text/html'});
    									response.write(data);
    									return response.end();
    								     }
 		    );
}

function form_handler(response,Data,dbcon)
{
	console.log("Form Handler called");
	// our first non blocking operation with a callback function
	fs.readFile('./../html/sign_in.html', function(err, data) {
    									response.writeHead(200, {'Content-Type': 'text/html'});
    									response.write(data);
    									return response.end();
    								     }
 		    );
 	//Blank unless client submit data;
 	console.log("Data:"+Data);
}

function form_upload(response,Data,dbcon)
{
	console.log("Form Upload called");
	console.log(Data);
	let parseObject = querystring.parse(Data);
	dbcon.query(`insert into student values("${parseObject.name}","${parseObject.pin}" , "${parseObject.email}","${parseObject.lab}" , '${new Date().toISOString().slice(0, 19).replace('T', ' ')}' , NULL)`, function (err, result) {
    if (err) 
	{
		//Handling database error by sending status to user and asking retry
		fs.readFile('./../html/badRequest.html', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			return response.end();
				});
	}
	else
	{	
		//User has successfully entered the data in dbms
		fs.readFile('./../html/signed_in.html', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			return response.end();
				}
		);	}
	});

}

function taForm(response,Data,dbcon)
{
    console.log("TA sign in form called");
    fs.readFile('./../html/TA_sign_in.html', function(err, data) {
    									response.writeHead(200, {'Content-Type': 'text/html'});
    									response.write(data);
    									return response.end();
    								     }
    							);
}

function taForm_upload(response,Data,dbcon)
{
    console.log("TA formUpload called");
	console.log(Data);
	let parseObject = querystring.parse(Data);
	dbcon.query(`select * from TAs where email like "${parseObject.email}";`,function (err, result) {
    if (err) 
	{
		//Handling database error by sending status to user and asking retry
		fs.readFile('./../html/badRequest.html', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			return response.end();
				});
	}
	else
	{	
		if(result.length == 0 || result[0].pin != parseObject.pin )
		{

			fs.readFile('./../html/badRequest.html', function(err, data) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				return response.end();
					});
		}
		else
		{
		//TA has successfully signed in
		taQueueReq(response,Data,dbcon);
		}
		
	}
});}

function taQueueReq(response,Data,dbcon)
{
	dbcon.query(`select * from student where marks is  NULL order by time limit 3;`, function (err, result) {
		if (err) throw err;
	    fs.readFile('./../html/TA_studentList.ejs', function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			var renhtml = ejs.render(data.toString(),{ObjArray:result});
			response.write(renhtml);
			return response.end();
			}
			);
		});
}

function taStudent_upload(response,Data,dbcon)
{
	console.log("TAStudent Upload called");
	console.log(Data);
	let parseObject = querystring.parse(Data);
	if(parseObject.submit == "Submit")
	{
		dbcon.query(`update student set marks=${parseObject.marks} where email="${parseObject.email}"` ,function (err, result) {
		if (err) 
		{
			//Handling database error by sending status to user and asking retry
			fs.readFile('./../html/badRequest.html', function(err, data) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				return response.end();
					});
		}
		else
		{	
			//TA has successfully entered the data in dbms
			taQueueReq(response,Data,dbcon);
		}
		});	
	}
	else if(parseObject.submit == "Skip")
	{
		dbcon.query(`update student set time='${new Date().toISOString().slice(0, 19).replace('T', ' ')}' where email="${parseObject.email}"` ,function (err, result) {
			if (err) 
			{
				//Handling database error by sending status to user and asking retry
				fs.readFile('./../html/badRequest.html', function(err, data) {
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write(data);
					return response.end();
						});
			}
			else
			{
				taQueueReq(response,Data,dbcon);
			}	
		});	
	}
}



exports.base_handler= base_handler;
exports.form_handler = form_handler;
exports.form_upload = form_upload;
exports.taForm = taForm;
exports.taForm_upload = taForm_upload;
exports.taStudent_upload = taStudent_upload;
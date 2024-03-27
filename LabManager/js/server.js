
// This program/file will start the server;identify which path/website asked then send the control to route;
var http = require('http')
var url = require('url')
var dbms = require('./sql.js');
function start(route,handle)
{
	function onRequest(request,response)
	{
		console.log("Request URL:"+request.url);
		console.log("Request IP:"+request.ip);
		console.log("Request Method:"+request.method);
		//request objects
		var path = url.parse(request.url).pathname; // url.parse helps to separate path and querystring
		var query = url.parse(request.url).query;
		
		var postData = "";
		request.addListener("data",function(postDatachunk){ console.log("Receiving Listener Data.");postData += postDatachunk;});
		request.addListener("end",function(){
		
							console.log("Request for "+path+" received. Sending request to 'route'");
							route(path,handle,response,postData,dbms.con);
						    }
				   );
					
		
	
		//response objects
		//response.writeHead(200, {"Content-Type" : "text/plain"});
		//response.write("Server Response: Hello World");
		//response.end();
	}
	
	http.createServer(onRequest).listen(8080);
	console.log("Server has started");
	dbms.con.connect(function(err){
                            if(err) throw err;
                            console.log("DB connected!");
                        });
    
	
}

exports.start = start;


var server = require("./server");
var router = require("./router");
var req_handler = require("./requestHandler");

var handle = {};

//Introduction page + links to other pages
handle["/index"] = req_handler.base_handler;

//Form for student to fill to enter queue
handle["/"] = req_handler.form_handler;

//Above filled form handler; Database management; return status
handle["/formUpload"]=req_handler.form_upload;

//Form for TA to fill to access student queue
handle["/taForm"] = req_handler.taForm;

//Above filled form handler; returns Student info with section to fill in marks
handle["/taForm_upload"] = req_handler.taForm_upload;

//Above filled form handler; Database managment;
handle["/taStudent_upload"] = req_handler.taStudent_upload;

server.start(router.route,handle);

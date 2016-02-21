var express = require("express");
var mongoose = require("mongoose");
var con = require("./base_converter.js");

var port = process.env.PORT || 8000;
var dbport =process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL || 'mongodb://localhost/5000';


mongoose.connect(dbport, function (err, res) {
	if(err){
		console.log ('ERROR connecting to: ' + dbport + '. ' + err);
	} 
	else{
		console.log ('Succeeded connected to: ' + dbport);
	}
});

var schema = new mongoose.Schema({
	bigUrl: {type: String},
	shortUrl: {type: String}
});

var UrlCollection = mongoose.model("ShortenedUrls", schema);

function saveNew(str, response){
	var date = new Date();
	//console.log(date.getDate());
	var shortened = String( con.changeBase(date.getTime()+parseInt(Math.random()*10000)) );
	var u = new UrlCollection({bigUrl: str, 
							   shortUrl: shortened});
	u.save(function(err){
		if(err){
			console.log("error on save");
		}
		else{
			console.log("new entry saved");
			response.send({"originalUrl": str, "shortenedUrl": shortened});
		}
	});
}

function findShortUrl(short, response){
	var query = UrlCollection.findOne({'shortUrl': short});
	query.select('bigUrl');
	query.exec(function(err, result){
		if(err){
			console.log(err);
			throw err;
		}
		if(result){
			
		}
		else{
			//return null;
		}
	});
}

function findBigUrl(big, response){
	var query = UrlCollection.findOne({'bigUrl': big});
	query.select('shortUrl');
	query.exec(function(err, result){
		if(err){
			console.log(err);
			throw err;
		}
		if(result){
			response.send({"originalUrl": big, "shortenedUrl": result.shortUrl});
		}
		else{
			//return null;
			saveNew(big, response);
		}
	});
}

function findAll(){
	UrlCollection.find({}, function(err, result){
		if(err) throw err;
		console.log(result);
	})
}

var app = express();
app.get("/new/:url*", function(req, res){         
	var bigUrl = req.url;
	bigUrl = bigUrl.slice(5);
	findBigUrl(bigUrl, res);
	//console.log("hit", bigUrl);
	

});

app.listen(port);
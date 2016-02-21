/*
Api for URL shortening. 

*1. The code gets long urls at "/new/SOME_LONG_URL".
	  First the long url is checked whether it already exists in the collection or not using findBigUrl().
	  Now if it exists, response is sent in json in the form {originalUrl: ababab, shortenedUrl: ab}.
	  If it doesn't exists, findBigUrl() calls saveNew() and it generates a short url and saves it to the collection
	  and returns the response in the format {originalUrl: ababab, shortenedUrl: ab}.

*2. When req comews at '/shortUrl', findShortUrl() is called and it maps the short url to the original one and
	  and redirects to the original url. In case it doesn't finds a corresponding entry, it returns an error.

	  Short url is generated by using UxixTimestamp at that instant + a rand no b/w(0, 1000) and then converting
	  it to base62 form.
*/
var express = require("express");
var mongoose = require("mongoose");
var con = require("./base_converter.js"); //this has a function changeBase(int) which returns corresponding base62

var port = process.env.PORT || 8000;      //port where app runs
var dbport =process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL || 'mongodb://localhost/5000';  //port for db

//connect to mongoose
mongoose.connect(dbport, function (err, res) {
	if(err){
		//console.log ('ERROR connecting to: ' + dbport + '. ' + err);
	} 
	else{
		//console.log ('Succeeded connected to: ' + dbport);
	}
});
//define the schema in mongoose
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
			//console.log("error on save");
		}
		else{
			//console.log("new entry saved");
			response.send({"originalUrl": str, "shortenedUrl": shortened});
		}
	});
}

function findShortUrl(short, response){
	var query = UrlCollection.findOne({'shortUrl': short});
	query.select('bigUrl');
	query.exec(function(err, result){
		if(err){
			//console.log(err);
			throw err;
		}
		if(result){
			response.redirect(result.bigUrl);
		}
		else{
			response.send("Error! Wrong link");
			//return null;
		}
	});
}

function findBigUrl(big, response){
	var query = UrlCollection.findOne({'bigUrl': big});
	query.select('shortUrl');
	query.exec(function(err, result){
		if(err){
			//console.log(err);
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
		//console.log(result);
	})
}

var app = express();
app.use(express.static("public/"));
app.get("/new/:url*", function(req, res){         
	var bigUrl = req.url;
	bigUrl = bigUrl.slice(5);
	findBigUrl(bigUrl, res);
	//console.log("hit", bigUrl);
});

app.get("/:short", function(req, res){
	var shortUrl = req.params.short;
	//console.log(shortUrl);
	findShortUrl(shortUrl, res);
});

app.get("/", function(req, res){
	req.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.render("index.html");
});

app.listen(port);
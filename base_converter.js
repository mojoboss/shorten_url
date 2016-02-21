exports.changeBase = function(num){
	if(num==0)
		return 'a';
	//this str is 62 in length and is used to map numbers from base64 to corresponding characters
	var baseStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var base = baseStr.length;
	//var base = 2;   //just for testing in base 2
	var list = [];   //this is the list where the remainders while converting base are stored
	while(num > 0 ){
		var r = num%base;
		list.push(r);
		num = parseInt(num/base);
	}
	list=list.reverse();   //reverse the list to get number in converted base
	var newBaseNo = "";
	for(var i=0; i<list.length; i++){
		newBaseNo += baseStr[list[i]];    //map with the characters
	}
	return newBaseNo;
}


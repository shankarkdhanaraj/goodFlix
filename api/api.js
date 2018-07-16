//create a function
	//use npm request module to send a request to yummly api 
//export that function

const request = require('request');
const config = require('../config.js');



const getMoviesByName = (name,callback) => {


	let options = {
    url: `https://ee.iva-api.com/api/Entertainment/Search/?ProgramTypes=Movie&Title=${name}&subscription-Key=${config.API_KEY}`,
    json:true,
    headers: {
     'User-Agent': 'request',
     "Content-Type": "application/json",
     'Ocp-Apim-Subscription-Key':`${config.API_KEY}`,
     "Access-Control-Allow-Origin": true
    }
  }

  request(options, function(err, response, body){
  if(err){
    console.log('error in request module');
    callback(err,null)
  }else{
    console.log('IVA Request SUCCESS');
    callback(null,response);
    // var results = body.matches;
    // callback(null,results);
  }
})

}


module.exports.getMoviesByName = getMoviesByName;
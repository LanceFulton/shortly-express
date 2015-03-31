var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
	tableName: 'users',

	initialize: function(username, password){
		this.username = username;
		console.log('this.username: ', this.username);
    console.log('username: ', username);
    console.log('password: ', password);
		if(password){
		  bcrypt.hash(password, null, function(){
		    console.log('hashing');
		  }, function(err, res){
		    if (err){
		      console.log('error hashing');
		    } else {
		    	// console.log('this: ', this);
		    	console.log('this.model: ', this.model);

		      User.forge({username: username, password:res}).save().then(function(model){
		      	console.log('model created: ', model);
		      	
		      }); 
		    }
		  })
		}
	},

});

module.exports = User;
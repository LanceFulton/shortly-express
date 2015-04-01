var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
	tableName: 'users',

	initialize: function(username, password){
		this.on('creating', this.hashPassword);
	},

	comparePassword: function(attemptedPassword, callback) {
		bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch){
			callback(isMatch);
		});
	},

	hashPassword: function() {
	var cipher = Promise.promisify(bcrypt.hash);
	return cipher(this.get('password'), null, null).bind(this)
		.then(function(hash){
			this.set('password', hash);
		});
	}

	// 	if(this.password){
	// 		bcrypt.hash(this.password, null, function(){
	// 		console.log('hashing');
	//   	}, function(err, res){
	//     	if (err){
	// 	      console.log('error hashing');
	// 	    } else {
	// 	      User.forge({username: username, password:res}).save().then(function(model){
	//       	}); 
	//     	}
	//   	})
	// 	}
	// }
});

module.exports = User;
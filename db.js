var Sequelize = require('sequelize');
var dbConfig = require('./dbConfig');


//Setting up the config
var seqInst = new Sequelize(dbConfig.dbName , dbConfig.login, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
});


//Checking connection status
seqInst
.authenticate()
.then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


// create db table model
var dbMod = require('./dBModel')(Sequelize, seqInst);
var User = dbMod.User();
var Oath = dbMod.Oath();
var Location = dbMod.Location();

// Find db  user by id
exports.UserById = function(userId, result) {

    User.find({ where: { id: userId } })
    .then(function (users) {
               result(users);
    });
};

exports.UserIdByAccessToken = function (access_token, result) {
    Oath.find({ where: { access_token: access_token } })
    .then(function (othObj) {
        if (othObj==null) {
            console.log("access_token not found in DB",access_token) 
            result(null);
        } else {
            result(othObj.user_id);
        }

               
    });

};

exports.FindOathObjByUserId = function (userId, result) {

    Oath.find({ where: { user_id: userId } })
    .then(function (oathObj) {
               result(oathObj);
    });
};


exports.UserByFacebookId = function(fbId, result) {

    User.find({ where: { fb_id: fbId } })
    .then(function (users) {
               result(users);
    });

};

// Insert User to Db
exports.CreateNewUser = function (fb_user, result) {

    var new_user = User.build({
        last_name: fb_user.last_name,
        first_name: fb_user.first_name,
        email: fb_user.email,
        fb_id: fb_user.id,
        fb_cover_link: fb_user.picture.data.url

    })

    new_user.save().then(function () {
        // ....saved success
        result(new_user)
    })
};


// Savee Oath
exports.SaveTokensToDb = function (authObj, result) {
    
    var new_oath = Oath.build({
        user_id: authObj.user_id, 
        access_token: authObj.access_token,
        refresh_token: authObj.refresh_token,
        access_token_exp: authObj.access_token_exp

    })

    new_oath.save().then(function () {
        // ....saved success
        result(new_oath)
    })
};


exports.SaveUserLocation = function (user_id, lat, long, result) {
    var new_location = Location.build({
        user_id: user_id, 
        lat: lat,
        long: long
    })

    new_location.save().then(function () {
        // ....saved success
        console.log("writted to db location obj= ", new_location);
        result(new_location)
    })
};


exports.GetAllLocations = function(result) {
    
    Location.findAll({
         attributes: ['id', 'lat', 'long'] // , 'date_of_creation' , 'lat', 'long'
    })
    .then(function(dbLocations){ 
        result(dbLocations)
    })
};
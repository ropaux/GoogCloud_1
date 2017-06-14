var randtoken = require('rand-token');
var graph = require('fbgraph');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var DB = require('./db');
var async = require('async');


module.exports =  {
    
    getBasic : function(req, res) {
        console.log('get login api');
        res.status("200").send('logino testas blaaa');
        
    },


    loginAuth : function(req, res) {

        // 1- from fb token, get user object from fb req.body.fb_token
        // 2- from fb.user.id search for user in local DB, if found return user, if not create and return user
        // 3- from user.id generate token object
        // 4 save tokens to DB, responde token auth object.


        async.waterfall([

            async.apply(getFbUserData, req.body.fb_token),
            getDBUserObj,
            generateTokens,
            saveTokens

           

        ], function (err, data) {
            // Code to execute after everything is done.
            console.log("finnito= ", data.access_token);
            if (err) res.status("400").send("Error ", err);
            res.status("200").send(data);
        });

       



 }
    


};




// private
function getFbUserData(fb_access_token, callback) {
    graph.setAccessToken(fb_access_token)
    var options = {
        timeout: 3000
        , pool: { maxSockets: Infinity }
        , headers: { connection: "keep-alive" }
    };

    graph
        .setOptions(options)
        .get("me?fields=id,email,first_name,last_name,birthday,picture", function (err, res) {
            if (err) callback(true, res);
            callback(null, res);
        });
}

function getDBUserObj(fbUser, callback) {

    if (fbUser.id !== null) {
        DB.UserByFacebookId(fbUser.id, function (userResult) {
            if (userResult) {
                // user  exist
                callback(null, userResult)
            } else {
                // user doesnt exist in our DB, register as new
                DB.CreateNewUser(fbUser, function (newUser) {
                    callback(null, newUser)
                });
            }
        });

    } else {
        // error fb user error
        callback(null);
    }
}


function generateTokens(dbUser, callback) {
    var expiration = (60 * 60 * 24); // 10 days
    var user1 = {
        name: "petka", lastName: "bbb",
        password: "xxx"
    };
    var token = jwt.sign(user1, 'ilovenyc', {
        expiresIn: expiration
    });

    var refreshToken = randtoken.uid(256)

    var data = {
        user_id: dbUser.id,
        message: 'New token generated',
        access_token: token,
        access_token_exp: expiration,
        refresh_token: refreshToken
    };


    // return the information including token as JSON
    callback(null, data);

}

function saveTokens(tokensObj, callback) {
    // find if user_id exists in Oath table
    DB.FindOathObjByUserId(tokensObj.user_id, function (authObj) {
        // update db ////
        if (authObj) {
            authObj.updateAttributes({
                access_token: tokensObj.access_token,
                refresh_token: tokensObj.refresh_token,
                access_token_exp: tokensObj.access_token_exp,
            })
                .then(function () {
                    callback(null, authObj);
                })
        }/////////
        else {
            // user havent got any records- create
            DB.SaveTokensToDb(tokensObj, function (authObj) {
                callback(null, authObj);
            })
        }
    })
}





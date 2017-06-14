var DB = require('./db');
var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports =  {
    
    getLocations: function (req, res) {
        var query = req.query;
        DB.GetAllLocations((locations) => res.status(200).send({ locations }));
    },

    sendlocation: function (req, res) {
        console.log("access_token ", req.body.access_token)

        DB.UserIdByAccessToken(req.body.access_token, (user_id) => {
            if (user_id == null) {
                    res.status("400").send('error, bad access_token');
                } else {
                    DB.SaveUserLocation(user_id, req.body.lat, req.body.long, (result) => res.status(200).send({ 'saved to db': result }) )
                }
        });
    }






}


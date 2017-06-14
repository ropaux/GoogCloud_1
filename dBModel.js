
module.exports = function (Sequelize, seqInst) {

  var module = {};


  module.User = function () {

    var User = seqInst.define('users', { 
      last_name: Sequelize.STRING,
      first_name: Sequelize.STRING,
      email: Sequelize.STRING,
      fb_id: Sequelize.STRING,
      fb_cover_link: Sequelize.STRING
    }, {
        updatedAt: 'last_update',
        createdAt: 'date_of_creation'
      });

    return User;
  };


  module.Oath = function () {

    var Oath = seqInst.define('oaths', {
      user_id: Sequelize.STRING,
      access_token: Sequelize.STRING,
      refresh_token: Sequelize.STRING,
      access_token_exp: Sequelize.DATE
    }, {
        updatedAt: 'last_update',
        createdAt: 'date_of_creation'
      });

    return Oath;
  };

  module.Location = function () {

    var Location = seqInst.define('locations', {
      user_id: Sequelize.STRING,
      lat: Sequelize.STRING,
      long: Sequelize.STRING
    }, {
        updatedAt: 'last_update',
        createdAt: 'date_of_creation'
      });

    return Location;
  };



  return module;
};






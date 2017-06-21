/*
// Heroku DB
module.exports = {

'dbName': 'pupf3h764kc87sic',
'login': 'h0iku262vzw62dd8',
'password': 'q3iuk3mzvh9813tc',
'host': 'y0nkiij6humroewt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
'port': 3306,
'dialect': 'mysql'

};
*/

//  docker 
module.exports = {

'dbName': process.env.DATABASE_NAME || 'heroku',
'login':  process.env.DATABASE_USER || 'root', 
'password': process.env.DATABASE_PASSW || 'bbtv99',
'host': process.env.DATABASE_HOST || '104.155.108.185',
'port': 3306,
'dialect': 'mysql'

};


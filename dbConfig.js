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

'dbName': process.env.DATABASE_NAME || 'pupf3h764kc87sic',
'login':  process.env.DATABASE_USER || 'h0iku262vzw62dd8', 
'password': process.env.DATABASE_PASSW || 'q3iuk3mzvh9813tc',
'host': process.env.DATABASE_HOST || 'y0nkiij6humroewt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
'port': 3306,
'dialect': 'mysql'

};


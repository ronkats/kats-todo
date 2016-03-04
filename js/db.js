
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "apps.ronniekats.nl",
  user: "appadmin",
  password: "140@Rixtwei",
  database: "kats_todo_db"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//records count
con.query('SELECT * FROM todo_table',function(err,rows){
    if (err) { throw err; }

  console.log('Data received from Db:\n');
  console.log(rows);
});

var store_taak = { ID: 1, Aangemaakt: '3-3-2016 22:34', Afgerond:0, Titel:'De titel', Content:'inhoud van de taak', Gebruiker:'gebruiker1' };
con.query('INSERT INTO todo_table SET ?', store_taak, function(err,res){
    if (err) { throw err; }

  console.log('Last insert ID:', res.insertId);
});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
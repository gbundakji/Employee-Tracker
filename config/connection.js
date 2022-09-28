const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createConnection({
  port     : 3306,
  host     : 'localhost',
  user     : 'root',
  password : 'PrincessLeia-1',
  database : 'employeeTracker_db',
},
console.log(`Connected to the employeeTracker_db database`),
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗─────────────────
    ║╔══╝─────║║──────────────║║╚╝║║─────────────────
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║─────
    ───────╚╝──────╚══╝─────────────────────╚══╝─────`)
);
 
connection.connect();

connection.query = util.promisify(connection.query); 
  
module.exports = connection; 
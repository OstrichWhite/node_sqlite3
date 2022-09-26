const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/ABS');

const createTable = ()=>{
  db.run("CREATE TABLE Employee (id INTEGER, loginTime DATE, logoutTime DATE)");
}

const loginRegister = () => {
  db.prepare("INSERT INTO Employee (id,loginTime) VALUES(?,?)").run(1,Date.now()).finalize();
}

const logoutRegister = () => {
  db.prepare("INSERT INTO Employee (id,logoutTime) VALUES(?,?)").run(2,Date.now()).finalize();
}
const updateLogoutRegister = () => {
  db.prepare("UPDATE Employee SET logoutTime=? where id=?").run(Date.now(),1).finalize();
}
const deleteLogoutRegister = () => {
  db.prepare("Delete from Employee  where id=?").run(1).finalize();
}
// createTable()
// loginRegister()
// logoutRegister()
// updateLogoutRegister()
// deleteLogoutRegister()
db.serialize(() => {
  db.each("SELECT * FROM Employee", (err, row) => {
    console.log({...row});
  });
});

db.close();
const mysql = require("mysql");

//mysql연결
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "mini",
  port: 3306,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

const db_getTodos = (data, cb) => {
  const query = "select * from todo";
  conn.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    cb(result);
  });
};

const db_postTodo = (data, cb) => {
  const query = "insert into todo (title, done) values (?, ?)";
  conn.query(query, [data.title, data.done], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    cb();
  });
};

const db_update = (data, cb) => {
  const query = "update todo set title = ?, done= ? where id = ?";

  conn.query(query, [data.title, data.done, data.id], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    cb();
  });
};

const db_delete = (data, cb) => {
  const query = "delete from todo where id = ?";

  conn.query(query, [data.id], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    cb();
  });
};

module.exports = {
  db_getTodos,
  db_postTodo,
  db_update,
  db_delete,
};

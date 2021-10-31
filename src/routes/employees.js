const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  mysqlConnection.query("Select * from employees", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM employees where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { id, name, salary } = req.body;

  const query = `
call employeeAddOrEdit(?, ?, ?);
`;

  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      console.log("Empleado agregado");
    } else {
      console.log(err);
    }
  });
});

router.put("/:id", (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
  call employeeAddOrEdit(?, ?, ?);
  `;

  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Empleado actualizado" });
    } else {
      console.log(err);
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "delete from employees where id = ?";
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Empleado eliminado" });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

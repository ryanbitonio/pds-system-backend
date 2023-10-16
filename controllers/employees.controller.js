const sampleEmployee = require("../models/employees.model");

function getEmployees(req, res) {
  res.json(sampleEmployee);
}

module.exports = getEmployees;

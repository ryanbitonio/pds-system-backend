const sampleEmployees = require("../models/employees.model");

function getEmployees(req, res) {
  res.json(sampleEmployees);
}

module.exports = getEmployees;

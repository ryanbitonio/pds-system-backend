const express = require("express");

const getEmployees = require("../controllers/employees.controller");

const employeesRouter = express.Router();

employeesRouter.get("/", getEmployees);

module.exports = employeesRouter;

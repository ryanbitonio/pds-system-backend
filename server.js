const express = require("express");
const app = express();

const PORT = 3000;

const getEmployees = require("./controllers/employees.controller");

app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get("/employees", getEmployees);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

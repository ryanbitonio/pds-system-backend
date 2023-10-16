const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const helmet = require("helmet");

const PORT = 3000;

const employeesRouter = require("./routes/employees.router");

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use("/employees", employeesRouter);

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
  });

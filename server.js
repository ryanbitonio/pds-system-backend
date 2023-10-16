const express = require("express");
const app = express();

const PORT = 3000;

const sampleData = {
  firstName: "Ryan",
  middleName: "Gonzaga",
  lastName: "Bitonio",
  mobileNumber: "09760760951",
  email: "ryanbitonio.ayang@gmail.com",
};

app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get("/", (req, res) => {
  res.json(sampleData);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

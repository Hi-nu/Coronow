const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./database");
const cors = require('cors');

const statController = require("./controller/stat-controller");
//const localStatController = require("./controller/local-stat-controller")

async function launchServer() {
  
    const app = express();
  
  app.use(cors({
    origin: '*', 
    credential: 'true' 
}));

  app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({ message: "hello cononow!" });
  });

  app.get("/stats", statController.getAll);
  app.post("/stats", statController.insertOrUpdate);
  app.delete("/stats", statController.remove);

 // app.get("/localstat", localStatController.getAll);
 // app.post("/localstat", localStatController.insertOrUpdate);
  //app.delete("/localstat", localStatController.remove);

  try {
    await sequelize.sync();
    console.log("Database is ready!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error);
    process.exit(1);
  }

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
  });
}

launchServer();

const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGO_CONN_STR, { useNewUrlParser: true });

mongoose.connection.on("open", async function () {
  try {
    const adminDb = mongoose.connection.db.admin();
    const dbList = await adminDb.listDatabases();
    console.log("Databases on the MongoDB instance: ", dbList.databases);
  } catch (err) {
    console.log("Error listing databases: ", err);
  }
});

mongoose.connection.on("error", function (err) {
  console.log("DB error");
  console.log(err);
});
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();


// routes connect (crud)

app.use(express.json());
app.use(require("./routes/contact"))


const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 6000;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});

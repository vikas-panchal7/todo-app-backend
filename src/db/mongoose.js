const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URL ||
    "mongodb+srv://vikaspanchal:vikas1234@cluster0.jjtmp.mongodb.net/todoapp",
  {
    useNewUrlParser: true,
  }
);

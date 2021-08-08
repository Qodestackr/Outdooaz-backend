const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/Auth'/*process.env.DATABASE_CONNECTION*/, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected: Auth");
};

module.exports = connectDB;
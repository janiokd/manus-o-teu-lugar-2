const config = require("../config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// Handle MongoDB connection with error handling
mongoose.connect(
  process.env.MONGODB_URI || config.MONGODB_URI,
  connectionOptions
).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.log('MongoDB connection failed:', error.message);
  console.log('Server will continue running without database connection');
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../user/user.model"),
  Property: require("../property/property.model"),
};

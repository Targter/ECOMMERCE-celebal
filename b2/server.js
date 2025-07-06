const app = require("./app.js");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database.js");
// Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "./.env" });
// }

require("dotenv").config();

// Connecting to database
console.log("me");
(async () => {
  try {
    await connectDatabase();
    console.log("end");
  } catch (error) {
    console.error("Application failed to start:", error);
    process.exit(1);
  }
})();
// console.log("proces:", process.env.CLOUDINARY_API_KEY);
// console.log("proces:", process.env.CLOUDINARY_NAME);
// console.log("proces:", process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

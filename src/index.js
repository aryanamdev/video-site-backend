import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

configDotenv({ path: "./.env" });

connectDB()
  .then((response) => {
    app.on("error", () => {});

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB Connection Failed!!!", err);
  })
  .finally();

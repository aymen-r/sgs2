import mongoose from "mongoose";
import express from "express";
import clientRouter from "./routes/clientRoutes.js";

mongoose
  .connect("mongodb://localhost:27017/sgs")
  .then(() => {
    console.log("connected to db success");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/client", clientRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

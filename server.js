const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
app.use(cors());
app.use("/uploads", express.static("uploads"));
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;
require("./config");
require("./dbseed");

app.use(userRouter);
app.use(productRouter);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user")
require("dotenv").config();
const cors = require("cors")

const PORT = 5050;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute)
app.use("/api/posts", postsRoute)
app.use("/api/user", userRoute)


app.listen(PORT, ()=> console.log(`server is running on PORT${PORT}`));
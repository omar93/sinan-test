const express = require("express");
const app = express();
const cors = require("cors");
const hamsters = require("./routes/hamsters.js");
const path = require("path");
const matches = require("./routes/matches");
const matchWinners = require("./routes/matchWinners");
const winners = require("./routes/winners");
const losers = require("./routes/losers");

const PORT = process.env.PORT || 3233;
const staticFolder = path.join(__dirname, "static");

//Middleware
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url} `, req.params);
  next();
});
app.use(express.json());
app.use(cors());
app.use(express.static(staticFolder))

//Routes
app.use("/hamsters", hamsters);
app.use("/matches", matches);
app.use("/matchWinners", matchWinners);
app.use("/winners", winners);
app.use("/losers", losers);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

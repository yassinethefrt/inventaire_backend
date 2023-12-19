const express = require("express");
const app = express();
const morgen = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Range"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: true,
  })
);
app.use(cors());
dotenv.config();

// // middelware
app.use(morgen("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const users = require("./routes/users");
const Regions = require("./routes/Region");
const etablissemets = require("./routes/etablissemet");
const materiels = require("./routes/materiels");
const personels = require("./routes/personels");
const centres = require("./routes/centres");
const equipements = require("./routes/equipements");
const besoin = require("./routes/besoins");
const genreMateriel = require("./routes/genreMateriel");
app.use("/", users);
app.use("/", besoin);
app.use("/", personels);
app.use("/", Regions);
app.use("/", etablissemets);
app.use("/", equipements);
app.use("/", materiels);
app.use("/", centres);
app.use("/", genreMateriel);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Node API listening to port : ${port}`);
});

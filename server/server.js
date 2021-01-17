const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./model/index");
const Role = db.role;

db.sequelize.sync().then(() => {
    console.log("succecc postgre");
});

// db.sequelize.sync({force: true}).then(() => {
//     console.log("drop and create again the database");
//     initRole();
// }).then(() => {
//     console.log("succecc postgre");
// });

let corsOptions = {
  origin: "http://localhost:8000/"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.json({
       msg: "Welcome to the BROW"
   })
});

require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/routes")(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Run in ${PORT}`));

function initRole() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
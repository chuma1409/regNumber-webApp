// const emitter = new EventEmitter()
// emitter.setMaxListeners(100)
// // or 0 to turn off the limit
// emitter.setMaxListeners(0)rs
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Registrations = require("./registrations");
const _ = require("lodash")
const route = require("./routes")
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/registration';
const pool = new Pool({
  connectionString
});
const registrations = Registrations(pool)
const routes = route(registrations)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// app.engine('handlebars', exphbs({
//     layoutsDir: './views/layouts'
// }));

app.use(express.static('public'));
;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get("/",routes.home) 


app.post("/registrations", routes.addReg)

app.get("/registrations", routes.filter)

app.get("/reset", routes.reset);

const PORT = process.env.PORT || 3330;


app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});
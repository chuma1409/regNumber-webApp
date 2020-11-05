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
// const route = require("./routes")
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/registration';
const pool = new Pool({
  connectionString
});
const registrations = Registrations(pool)
// const routes = route(greetings)

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



// app.post('/registrations', async function (req, res) {
//   var regNmbr = _.upperCase(req.body.regiNumber)
//   if(!regNmbr){
//     req.flash('error', "Please enter valid registration number")
//   }else{
//     var setted = await registrations.setRegNumber(regNmbr)
//   }
 
 
//   var list =  await registrations.showList();
// res.render('index', {
//   setted,
//   list: list


// });

// });

app.get("/", async function(req, res) {

  res.render("index");
});

app.post("/registrations", async function(req, res) {
  var name = req.body.regiNumber
  let checkDuplicate = await registrations.repCheck(name)
  if (checkDuplicate !== 0) {
    req.flash('exists', 'This registration has already been added')
   
  }else if (name.startsWith('CY ') || name.startsWith('CA ') || name.startsWith('CJ ')) {
    await registrations.setRegNumber(name);
      var reg = await registrations.showList();
  } else if (!name.startsWith('CY ') || !name.startsWith('CA ') || !name.startsWith('CL ')) {
      req.flash('error', 'Please enter a valid registration')
  }



  res.render("index", {
      reg_number: reg
  });
});
app.get("/registrations", async function(req, res) {
  let towns = req.query.towns

  let filteredList = await registrations.filter(towns);

  res.render("index", {
      reg_number: filteredList
  });
});

app.post("/filter:town",async function(req, res) {
  let towns = await req.body.towns


  res.render("index");
});


app.get("/reset", async function(req, res) {
  await registrations.resetBtn()
  res.redirect("/")
});

const PORT = process.env.PORT || 3330;


app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Registrations = require("./registrations");
// const route = require("./routes")
// const pg = require("pg");
// const Pool = pg.Pool;
// const connectionString = process.env.DATABASE_URL || 'postgresql://chuma:pg123@localhost:5432/greetings-webapp';
// const pool = new Pool({
// 	connectionString
// });
const registrations = Registrations()
// const routes = route(greetings)

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

// app.get('/', function(req,res){
//     req.flash('info', 'Welcome');
//     res.render('index')
// })

app.get('/', function(req,res){
    res.render('index')
})
  const PORT = process.env.PORT || 3020;


app.listen(PORT, function(){
    console.log("App started at port:", PORT)
});
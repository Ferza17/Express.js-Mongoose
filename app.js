const http = require("http"); // http core module
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const expressHbs = require('express-handlebars');


const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.render('404', {docTitle: 'Page Not Found'});
});

app.listen(4000);
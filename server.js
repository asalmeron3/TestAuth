//--------------Dependencies -----------------//
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
//-------------------------------------------//	

const app = express();
const PORT = process.env.PORT || 3002;

// ------ Configure body parser for AJAX requests--------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static(path.join(__dirname, '/build')));
// Add routes, both API and view
app.use('/',routes);
// app.use('/auth', routes);
// app.use('/', proxy({target: 'localhost:3002', changeOrigin: true}));
app.use(passport.initialize());
//-------------------------------------------------------//

//------------ Set up promises with mongoose -----------//
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/MyAuth",
  {
    useMongoClient: true
  }
);
//----------------------------------------------------//
//--------------- Start the API server ---------------//
app.listen(PORT, function() {
    console.log(`🌎  ==> MyAuth Server on PORT ${PORT}!`);
  });
// --------------------------------------------------//
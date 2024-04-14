// import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const session = require("express-session");
const cors = require("cors");


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


// Proxy configuration
// Forward all requests from /api/ml to Flask running on port 5000
app.use('/api/ml', createProxyMiddleware({
  target: 'http://127.0.0.1:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/ml': '', // optionally rewrite path
  },
}));

const signup = require('./routes/signup');
const login = require("./routes/login");
// const signinquestions = require("./routes/signinquestions");
const questionnaire = require('./routes/questionnaire');
const userdashboard = require("./routes/userdashboard");
// const hotel = require("./routes/hotel");
// const email = require("./routes/share");
const admin = require('./routes/admin');
// const flight = require("./routes/flight");
// const reservation = require("./routes/dashboard");
const users = require('./routes/users');

// Assuming the movie details route handler is in 'routes/movieDetails.js'
const movieDetails = require('./routes/movieDetails');

// to include JWT in API
app.use('/user', signup);
app.use('/login', login);
// app.use("/hotel", hotel);
// app.use("/send", email);
app.use('/admin', admin);
// app.use("/flight", flight);
// app.use("/getreservations",reservation);
app.use('/users', users);
app.use('/userdashboard', userdashboard);
app.use('/questionnaire', questionnaire);

// Use the movie details router. Assuming the route defined inside movieDetails.js starts with '/movie/details/:id'
app.use(movieDetails);

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');

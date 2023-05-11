//assign dependencies to variables.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotenv.config();

//specify a port number to run(8070). if that is not available use any available port. ||operator
const PORT = process.env.PORT || 8070;

app.use(cors());
/* Add the bodyParser middleware to parse JSON requests. will extract the JSON data from 
the request and parse it into a JavaScript object that can be 
easily manipulated in your server-side code.*/
app.use(bodyParser.json());

//connect database
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// .then(() => {
//     console.log('Connected to database!');
//     // Start listening for incoming requests
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => console.error(err));

//once connected to the databse this will use to check it
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb Connection Success!');
});

//create coonnection between front end and backend
const studentRoute = require('./routes/students_route');

/*By using app.use() method with the '/student' route as the first argument,
 you are telling Express to use this middleware for any route that starts with '/student'.
  This means that if a client makes a request to /student/create, /student/view, /student/update, or 
  any other route that starts with '/student', the request will be passed on to the studetRoute middleware
   to handle.*/
app.use('/student', studentRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});

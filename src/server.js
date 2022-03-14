'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const {user} = require('./models/index');
const notFound = require('./error-handlers/404.js');
const bearerAuth = require('./middleware/bearerAuth');
const serverError = require('./error-handlers/500.js');
const userRoute = require('./routes/user');
const V2 =require('./routes/v2');




app.use(express.json());
app.use(cors());

app.use(userRoute);


app.use('/api/v2',V2);



app.get('/', (req, res) => {
  res.send('Home Route')
});

app.get('/users',bearerAuth, async (req,res)=>{
  const allUsers = await user.findAll();
  res.status(200).json(allUsers);
});



app.use(notFound);
app.use(serverError);

function start(port) {
  app.listen(port,()=> {
    console.log(`running on PORT ${port}`);
  })
}

module.exports = {
  app: app,
  start: start
}
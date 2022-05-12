const express = require('express')
const app = express()
const routes = require('./routes/route');
const db = require('./config/db');
const {model}= require('./model/model');
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes );
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



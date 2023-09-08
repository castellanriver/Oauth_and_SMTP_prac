const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:1234@cluster0.jmifyp3.mongodb.net/')
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((err) => {
    console.log(err);
  })

app.use('static', express.static(path.join(__dirname, 'static')))


const port = 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
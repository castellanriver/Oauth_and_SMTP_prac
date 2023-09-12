const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/users.model');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine configuration

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:1234@cluster0.jmifyp3.mongodb.net/')
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((err) => {
    console.log(err);
  })

app.use('/static', express.static(path.join(__dirname, '../public')));

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', async(req, res) => {
  // user 객체 생성
  const user = new User(req.body)
  try {
    // user 컬렉션에 유저 저장
    await user.save();
    return res.status(200).json({
      success: true,
    })
  }
  catch (error) {
    console.log(error);
  }
})

const port = 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./data');
var Timer = require('./model/Timer');
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://eddy:eddy@cluster0-lmbhm.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger('dev'));

router.get('/get-timer', (req, res) => {
  Timer.find({myId: '1'}, (err, data) => {
    console.log(data);
    return res.send(data);
  });
});

router.post('/update-timer', (req, res) => {

  // const timer1 = new Timer({ time: 2, myId: 1 })
  // timer1.save((error, document) => {
  //   console.log(document);
  // });


  // Timer.find({myId: '1'}, (err, data) => {
  //   console.log(data);
  //   return res.send('hello');
  // });

  Timer.findOneAndUpdate({myId: '1'}, {time: req.body.timer}, (err, data) => {
    if (err) throw err;
    console.log(data);
    
    return res.send(data);
  });

  // timer1.updateTimer(req.body.timer);
  // return res.send('hello');
});


router.get('/hello', (req, res) => {
    console.log('hello!!@@!@!');
    

    // create a new user called chris
    var chris = new User({
      name: 'Chris'
    });

    // call the custom method. this will just add -dude to his name
    // user will now be Chris-dude
    chris.dudify(function(err, name) {
      if (err) throw err;

      console.log('Your new name is ' + name);
    });

    // call the built-in save method to save to the database
    chris.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully!');
    });
    // db.collection('test2').find({}).toArray((err, documents) => {
    //     if (err) throw error;
    
    //     console.log(documents);
    // });
    return res.send('hello!!!!');
});
// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  const Timer = db.collection('Timer');

  Timer.find({}).toArray().then((data) => {
    console.log(data[0].myTime);
    return res.json({ success: true, data, myTime: data[0].myTime });
  });
    // return res.json({ success: true, data: 'sure' });
});

// // this is our update method
// // this method overwrites existing data in our database
router.get('/updateData', (req, res) => {
  const Timer = db.collection('Timer');
  console.log(Timer);
  Timer.find('5d07d95f1c9d4400000321ac', {myTime: 2}, (err) => {
    console.log('hello???');
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// // this is our delete method
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// // this is our create methid
// // this method adds new data in our database
// router.post('/putData', (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: 'INVALID INPUTS',
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
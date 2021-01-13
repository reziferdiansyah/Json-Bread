const express = require('express');
const path = require('path');  // untuk mengabungkan peth ('/') 
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();

const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data.json'), 'utf8'));
const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(data, null, 3), 'utf8');
}

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

  //untuk menyimpan file seperti foto dll, di folder public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
  res.render('index', {
    data
  });
});

//Add
app.get('/add', function (req, res, next) {
  res.render('add');
});

app.post('/add', function (req, res) {
  data.push({
    string: req.body.string,
    integer: parseInt(req.body.integer),
    float: parseFloat(req.body.float),
    date: req.body.date,
    boolean: JSON.parse(req.body.boolean)
  });
  writeData(data);
  res.redirect('/');
})

//Edit
app.get('/edit/:id',
 function (req, res, next) {
  let id = req.params.id;
  res.render('edit', {
    item: data[id],
    id: id
  });
});

app.post('/edit/:id',function (req, res) {
let idx = req.params.id;
  data[idx] = ({
    string: req.body.string,
    integer: parseInt(req.body.integer),
    float: parseFloat(req.body.float),
    date: req.body.date,
    boolean: JSON.parse(req.body.boolean)
  })
  writeData(data);
  res.redirect('/');
})


//Search
// app.get('/search', function (req, res, next) {
//   res.render('search');
// });

app.post('/search', function (req, res, next) {
  const {id, string, integer, float, boolean} = req.body;
  res.render('index', { data: data });
});

//Delete
app.get('/Delete/:id', function (req, res, next) {
  let id = req.params.id;
  data.splice(id, 1);
  writeData(data);
  res.redirect('/');
});

//3000
app.listen(3000, () => {
console.log('web berjalan di port 3000')
})
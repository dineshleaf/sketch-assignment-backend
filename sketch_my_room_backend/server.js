var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('eventlist', ['eventlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/eventlist', function (req, res) {
  console.log('Sketch GET request');

  db.eventlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/eventlist', function (req, res) {
  console.log(req.body);
  db.eventlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/eventlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.eventlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/eventlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.eventlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/eventlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.eventlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, body: req.body.description, date: req.body.date, type: req.body.type}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server for Sketch");
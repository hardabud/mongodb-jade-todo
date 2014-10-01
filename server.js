var express = require('express');
var bodyParser = require('body-parser');
var todoCtrl = require('./controllers/todo');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', todoCtrl.getAll);
app.post('/', todoCtrl.add);
app.get('/:id', todoCtrl.editView);
app.post('/edit/:id', todoCtrl.edit);
app.get('/del/:id', todoCtrl.delete);

app.listen(3000, function() { console.log('Listening on 3000'); });

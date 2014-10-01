var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var todo = new Schema({  
    name: { type: String },
    modified: { type: Date, default: Date.now }
});

var todoModel = mongoose.model('todo', todo);

exports.getAll = function (req, res) {
  todoModel.find(function (err, todos) {
    if (err) { console.log(err); }
		res.render('index', {todos: todos});
  });
}

exports.add = function (req, res) {
  var todo;
  todo = new todoModel({
    name: req.body.name
  });
  todo.save(function (err) {
		if (err) { console.log(err); }
  });
	res.redirect('/');
}

exports.editView = function (req, res){
  todoModel.findById(req.params.id, function (err, todo) {
    if (err) { console.log(err); }
    res.render('todo', {todo:todo});
   });
}

exports.edit = function (req, res){
	todoModel.findById(req.params.id, function (err, todo) {
		todo.name = req.body.name;
		todo.save(function (err) {
			if (err) { console.log(err); }
			res.redirect('/');
		});
  });
}

exports.delete = function (req, res){
  todoModel.findById(req.params.id, function (err, todo) {
		todo.remove(function (err) {
			if (err) { console.log(err); }
      res.redirect('/');
    });
  });
}

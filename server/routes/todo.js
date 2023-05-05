const Router = require('express').Router();
const ToDo = require('../models/todo')

Router.get('/todos', (req, res, next) => {
    ToDo.find({})
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

Router.post('/addtodo', (req, res, next) => {
    const todo = req.body;
  const newtodo = new ToDo(todo)
  newtodo.save()
  .then(() => res.json(newtodo))
  .catch(err => {
    res.status(404).json({err: err})})
})

Router.get('/todos/:id', (req, res, next) => {
    ToDo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json(err))
})

Router.put('/update/:todoid', (req, res, next) => {
    ToDo.findByIdAndUpdate(req.params.todoid, req.body, {new: true})
        .then(todo => res.json(todo))
        .catch(err => res.status(500).json(err))
    .catch(err => res.status(404).json(err))
})

Router.delete('/:todoid', (req, res, next) => {
    ToDo.findByIdAndDelete(req.params.todoid)
    .then(() => res.json("Succesfully deleted the todo"))
        .catch(err => res.status(400).json(err))
})
// filter by category
Router.get('/todos/category/:category', (req, res, next) => {
    ToDo.find({category: req.params.category})
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

// filter by priority
Router.get('/todos/priority/:priority', (req, res, next) => {
    ToDo.find({priority: req.params.priority})
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = Router
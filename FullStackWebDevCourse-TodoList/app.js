//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const taskSchema = new mongoose.Schema({
  name: String
});

const Task = mongoose.model("Task", taskSchema);

const item1 = new Task({
  name: "Write Dairy",
});

const item2 = new Task({
  name: "Drink water",
});

const item3 = new Task({
  name: "Free your mind",
})

const defaultItems = [item1, item2, item3];

const taskListSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema]
});

const TaskList = mongoose.model("TaskList", taskListSchema);

app.get("/", function (req, res) {

  Task.find({}, function (err, tasks) {
    if (tasks.length === 0) {
      Task.insertMany(defaultItems, function (err) {
        if (!err) {
          console.log("Default tasks added successfully..");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: tasks });
    }
  });

});

app.get("/:category", function (req, res) {

  const taskListName = _.capitalize(req.params.category)
  TaskList.findOne({ name: taskListName }, function (err, foundTaskList) {
    if (!err) {
      if (!foundTaskList) {
        const taskList = new TaskList({
          name: taskListName,
          tasks: defaultItems
        });
        taskList.save();
        res.redirect("/" + taskListName);
      } else {
        res.render("list", { listTitle: taskListName, newListItems: foundTaskList.tasks });
      }
    }
  });
});

app.post("/delete", function (req, res) {
  const checkedTaskId = req.body.checkbox;
  const taskListName = req.body.taskList;
  if (taskListName === "Today") {
    Task.findByIdAndRemove(checkedTaskId, function (err) {
      if (!err) {
        res.redirect("/");
      }
    });
  } else {
    TaskList.findOneAndUpdate({ name: taskListName }, { $pull: { tasks: { _id: checkedTaskId } } }, function (err, foundTaskList) {
      if (!err) {
        res.redirect("/" + taskListName);
      }
    });
  }

});

app.post("/", function (req, res) {

  const item = req.body.newItem;
  const list = req.body.list;
  const newTask = new Task({
    name: item
  });
  if (list === "Today") {
    newTask.save();
    res.redirect("/");
  } else {
    TaskList.findOne({ name: list }, function (err, foundTaskList) {
      if (!err) {
        foundTaskList.tasks.push(newTask);
        foundTaskList.save();
        res.redirect("/" + list);
      }
    });
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

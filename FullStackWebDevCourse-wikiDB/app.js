//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//TODO

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function (req, res) {

        Article.find({}, function (err, results) {
            if (!err) {
                res.send(results);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save(function (err) {
            if (!err) {
                res.send("The article is added successfully!")
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("Deleted all articles successfully!");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleName")
    .get(function (req, res) {
        const articleTitle = req.params.articleName;
        Article.findOne({
            title: articleTitle
        }, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        });
    })
    .put(function (req, res) {
        const articleTitle = req.params.articleName;
        Article.update(
            { title: articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Successfully put the data");
                }
            });
    })
    .patch(function (req, res) {
        const articleTitle = req.params.articleName;
        Article.update(
            { title: articleTitle },
            { $set: req.body },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Successfully patched the data");
                }
            });
    })
    .delete(function (req, res) {
        const articleTitle = req.params.articleName;
        Article.deleteOne({
            title: articleTitle
        }, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted the article");
            }
        });
    })


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
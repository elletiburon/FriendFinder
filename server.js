var express = require("express");
var path = require("path");

var app = express();
var PORT = 2500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
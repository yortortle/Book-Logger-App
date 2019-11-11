const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/users.js")

router.get("/new", (req, res) => {
  res.render("users/new.ejs")
})

router.post("/", (req, res) => {
  console.log(req.body.password);
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log(req.body.password);

  User.create(req.body, (err, createdUser) => {
    console.log(createdUser);
    res.redirect("/books")
  })
})


module.exports = router;

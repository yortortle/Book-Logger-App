const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require ("bcrypt");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs")
})

router.post("/", (req, res) => {
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if (foundUser === null) {
      console.log("user not found");
      res.redirect("/sessions/new")
    }
    else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      if (doesPasswordMatch) {
        console.log("matches");
        req.session.username = foundUser.username;
        res.redirect("/books")
      }
      else {
        res.redirect("/sessions/new");
      }
    }
  })
})

module.exports = router;

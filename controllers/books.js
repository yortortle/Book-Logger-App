const express = require("express");
const router = express.Router();
const Books = require("../models/books.js")

router.get("/seed", (req, res) => {
    Books.create(
      [
        {
          name: "Zen and The Art Of Motorcycle Maintanence",
          page: 418,
          rating: 8,
          img: "https://images-na.ssl-images-amazon.com/images/I/41vxAMcHOzL._SX307_BO1,204,203,200_.jpg"
        },
        {
          name: "On the Shortness of Life",
          description: "seneca",
          page: 42,
          rating: 9,
          img: "https://dailystoic.com/wp-content/uploads/2018/01/seneca-3.jpg"
        },
        {
          name: "Meditations",
          description: "Marcus Aerelius",
          page: 112,
          rating: 6,
          img: "https://images-na.ssl-images-amazon.com/images/I/51B7EclqLBL._SX311_BO1,204,203,200_.jpg"
        },
      ]
    )
    res.redirect("/books");
})

//index route and various ejs routes
router.get("/", (req, res) => {
  if (req.session.username) {
    Books.find({username1: req.session.username}, (error, foundBooks) => {
      res.render("books/index.ejs", {
        book: foundBooks,
        username: req.session.username
      })
    })
  }
  else {
    res.redirect("/")
    console.log("not logged in");
  }
})

//new route
router.get("/new", (req, res) => {
  res.render("books/new.ejs")
})

//edit display route
router.get("/:id/edit", (req, res) => {
  Books.findById(req.params.id, (err, foundBook) => {
    res.render("books/edit.ejs", {
      book: foundBook
    })
  })
})

router.put("/:id", (req, res) => {
  Books.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBook) => {
    console.log(updatedBook);
    res.redirect("/books")
  })
})

//show route
router.get("/:id", (req, res) => {
  Books.findById(req.params.id, (error, foundBook) => {
    res.render("books/show.ejs", {
      book: foundBook
    })
  })
})

router.delete("/:id", (req, res) => {
  Books.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    res.redirect("/books")
  })
})

router.post("/", (req, res) => {
  console.log(req.body);
  const user = req.session.username;
  console.log(user);
  req.body.username1 = user;
  console.log(req.body);
  Books.create(req.body, (err, createdBook) => {
    if (err) {
      console.log(err);
      // alert("Information not entered proberly!")
    }
    else {
      console.log(createdBook);
      res.redirect("/books");
    }
  })
})

module.exports = router;

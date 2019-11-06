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
    res.redirect("/");
})

router.get("/", (req, res) => {
  Books.find({}, (error, foundBooks) => {
    res.render("books/index.ejs", {
      book: foundBooks
    })
  })
})

router.get("/new", (req, res) => {
  res.send("new")
})

router.get("/:id/edit", (req, res) => {
  res.send("edit");
})

router.get("/:id", (req, res) => {
  // res.send("Show")
  Books.findById(req.params.id, (error, foundBook) => {
    res.render("books/show.ejs", {
      book: foundBook
    })
  })
})


module.exports = router;

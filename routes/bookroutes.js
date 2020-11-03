const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const bookControllers = require("../controllers/bookcontroller");

router.get("/:bid", bookControllers.getBookID);

router.get("/user/:uid", bookControllers.getBookByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("author").not().isEmpty(),
  ],
  bookControllers.createBook
);

router.patch(
  "/:bid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  bookControllers.updateBook
);

router.delete("/:bid", bookControllers.deleteBook);

module.exports = router;

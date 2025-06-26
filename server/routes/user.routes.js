const express = require("express");
const {
  borrowBook,
  returnBook,
  borrowedBooks,
  updateProfile,
  userDetails
} = require("../controllers/user.controller");



//middlewares
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/checkRoles")

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("User")); 

router.get("/user-details", userDetails)
router.post("/borrow-book/:bookId", borrowBook);
router.post("/return-book/:transactionId", returnBook);
router.get("/borrowed-books-list", borrowedBooks);
router.patch("/update-profile", updateProfile);

module.exports = router;

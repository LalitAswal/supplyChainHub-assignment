const express = require("express");
const {
  userList,
  addBook,
  deleteBook,
  updateBook,
  bookList,
} = require("../controllers/admin.controller");

//middlewares
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/checkRoles")

const router = express.Router();

console.log("checking admin routes")
router.use(authenticate);
// router.use(authorizeRoles("Admin")); 

router.get("/user-list",authorizeRoles("Admin"),userList);
router.post("/add-book", authorizeRoles("Admin"),addBook);
router.delete("/delete-book/:bookId", authorizeRoles("Admin"),deleteBook);
router.patch("/update-book", updateBook);
router.get("/book-list", authorizeRoles("Admin", "User"),bookList);

module.exports = router;

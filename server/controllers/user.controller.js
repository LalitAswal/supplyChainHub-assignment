const Book = require("../models/books.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

const BORROW_LIMIT = 3;

const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await User.findById(userId).select("-password");

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Details", user: userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const borrowBook = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;

    // Find the book
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Check if user has already borrowed this book and not returned it
    const existingTransaction = await Transaction.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    });

    if (existingTransaction) {
      return res.status(400).json({ message: "You have already borrowed this book" });
    }

    // Check total borrow limit
    const borrowCount = await Transaction.countDocuments({
      user: userId,
      status: "borrowed"
    });

    if (borrowCount >= BORROW_LIMIT) {
      return res.status(400).json({ message: "Borrow limit reached" });
    }

    // Create transaction
    await Transaction.create({ user: userId, book: bookId });

    // Decrement available copies
    book.availableCopies -= 1;
    await book.save();

    return res.status(200).json({ message: "Book borrowed successfully" });

  } catch (error) {
    console.error("Error borrowing book:", error);
    return res.status(500).json({ message: "Error borrowing book" });
  }
};


const returnBook = async (req, res) => {
  try {
    const userId = req.userId;
    const { transactionId } = req.params;

    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId,
      status: "borrowed",
    });

    if (!transaction) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    transaction.status = "returned";
    transaction.returnDate = new Date();
    await transaction.save();

    const book = await Book.findById(transaction.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    return res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Error returning book" });
  }
};

const borrowedBooks = async (req, res) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({
      user: userId,
      status: "borrowed",
    }).populate("book");

    return res.status(200).json({ borrowedBooks: transactions });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return res.status(500).json({ message: "Error fetching borrowed books" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = {
  userDetails,
  borrowBook,
  returnBook,
  borrowedBooks,
  updateProfile,
};
const User = require("../models/user.model");
const Book = require("../models/books.model");

const userList = async (req, res) => {
  try {
    const users = await User.find({ role: "User" }).select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user list", error });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, description, totalCopies } = req.body;

    if (!title || !totalCopies) {
      return res.status(400).json({ message: "Title and totalCopies are required" });
    }

    const book = new Book({
      title,
      author,
      description,
      totalCopies,
      availableCopies: totalCopies,
      addedBy: req.userId, 
    });

    await book.save();
    return res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add book", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const isBorrowed = await Transaction.exists({
      book: bookId,
      status: "borrowed",
    });

    if (isBorrowed) {
      return res.status(400).json({
        message: "Cannot delete this book, already borrowed",
      });
    }

    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log('checking errr',error)
    return res.status(500).json({ message: "Failed to delete book", error });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId, ...updateData } = req.body;

    const isBorrowed = await Transaction.exists({
      book: bookId,
      status: "borrowed",
    });

    if (isBorrowed) {
      return res.status(400).json({
        message: "Cannot update the book as it is already borrowed",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update book", error });
  }
};

const bookList = async(req, res)=>{
    try {
        const bookList = await Book.find({})

        if(!bookList){
            return res.status(404).json({ message: "Please contact Admin to add new books" });
        }

        return res.status(200).json({ message: "Books List", book: bookList });
    } catch (error) {
        
    }
}

module.exports = {
  userList,
  addBook,
  deleteBook,
  updateBook,
  bookList
};

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  token = localStorage.getItem('token');
  role = localStorage.getItem('role'); // 👈 to control admin access

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<any>('http://localhost:3000/admin/book-list', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: (res) => this.books = res.book || [],
      error: () => alert('Failed to load books')
    });
  }

  borrowBook(bookId: string) {
    this.http.post(`http://localhost:3000/user/borrow-book/${bookId}`, {}, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: () => {
        alert('Book borrowed successfully');
        this.fetchBooks();
      },
      error: (err) => alert(err?.error?.message || 'Failed to borrow book')
    });
  }

  deleteBook(bookId: string) {
    if (!confirm("Are you sure you want to delete this book?")) return;

    this.http.delete(`http://localhost:3000/admin/delete-book/${bookId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: () => {
        alert('Book deleted successfully');
        this.fetchBooks();
      },
      error: () => alert('Failed to delete book')
    });
  }

  editBook(book: any) {
    this.router.navigate(['/edit-book'], { state: { book } });
  }
  logout() {
  localStorage.clear(); 
  alert('Logged out successfully');
  window.location.href = '/login';
}
}

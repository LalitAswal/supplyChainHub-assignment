import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borrowed-list',
  standalone: true,
  templateUrl: './borrowed-list.html',
  styleUrls: ['./borrowed-list.css'],
  imports: [CommonModule, RouterModule],
})
export class BorrowedListComponent implements OnInit {
  borrowedBooks: any[] = [];
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBorrowedBooks();
  }

  fetchBorrowedBooks() {
    this.http.get<any>('http://localhost:3000/user/borrowed-books-list', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: (res) => {this.borrowedBooks = res.borrowedBooks || []

        console.log(res.borrowedBooks)
      },
      error: () => alert('Failed to load borrowed books')
    });
  }

  returnBook(transactionId: string) {
    this.http.post(`http://localhost:3000/user/return-book/${transactionId}`, {}, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: () => {
        alert('Book returned successfully');
        this.fetchBorrowedBooks(); // refresh list
      },
      error: () => alert('Failed to return book')
    });
  }
}

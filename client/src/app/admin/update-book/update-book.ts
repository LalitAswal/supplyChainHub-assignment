import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  templateUrl: './update-book.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EditBookComponent {
  bookForm: FormGroup;
  token = localStorage.getItem('token');
  bookId: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    const navState = this.router.getCurrentNavigation()?.extras?.state as any;
    const book = navState?.book;

    if (!book) {
      alert('No book data found');
      this.router.navigate(['/book-list']);
    }

    this.bookId = book._id;

    this.bookForm = this.fb.group({
      title: [book.title],
      author: [book.author],
      description: [book.description],
      totalCopies: [book.totalCopies],
    });
  }

  onUpdate() {
    this.http
      .patch(
        `http://localhost:3000/admin/update-book`,
        {
          bookId: this.bookId,
          ...this.bookForm.value,
        },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .subscribe({
        next: () => {
          alert('Book updated successfully');
          this.router.navigate(['/book-list']);
        },
        error: () => alert('Failed to update book'),
      });
  }
}

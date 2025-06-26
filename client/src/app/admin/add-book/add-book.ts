import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AddBookComponent {
  bookForm: FormGroup;
  token = localStorage.getItem('token');

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      totalCopies: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    this.http.post('http://localhost:3000/admin/add-book', this.bookForm.value, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: () => {
        alert('Book added successfully');
        this.router.navigate(['/book-list']); 
      },
      error: () => alert('Failed to add book'),
    });
  }
}

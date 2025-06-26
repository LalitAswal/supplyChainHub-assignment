import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      return;
    }

    this.http.get<any>('http://localhost:3000/user/user-details', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: () => {
        alert('Error loading profile.');
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const { name, email, address } = this.user;

    this.http.patch('http://localhost:3000/user/update-profile', { name, email, address }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('Profile updated successfully.');
        this.editMode = false;
      },
      error: () => {
        alert('Failed to update profile.');
      }
    });
  }
}

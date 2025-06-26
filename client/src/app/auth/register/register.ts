import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // Adjust path as needed
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      userName: [''],
      name: [''],
      password: [''],
      verifyPassword: [''],
      role: ['User']
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert('Registered successfully!');
          console.log('Response:', res);
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Registration failed. Try again.');
        }
      });
    }
  }
}

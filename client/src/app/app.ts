// app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <h1>Library Management App</h1>
    <nav>
      <a routerLink="/login">Login</a> |
      <a routerLink="/register">Register</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App {}

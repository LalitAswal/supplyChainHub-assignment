import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
// import { UserListComponent } from './admin/user-list/user-list';
import { AddBookComponent } from './admin/add-book/add-book';
import { EditBookComponent } from './admin/update-book/update-book';
import { BookListComponent } from './admin/book-list/book-list';
import { ProfileComponent } from './user/profile/profile';
import { BorrowedListComponent } from './user/borrowed-list/borrowed-list';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book', component: EditBookComponent },
  { path: 'borrowed-books', component: BorrowedListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'user-details', component: ProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

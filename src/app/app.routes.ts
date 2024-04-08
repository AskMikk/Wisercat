import { Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sessions', pathMatch: 'full' },
    { path: 'sessions', component: UserRegistrationFormComponent }
];

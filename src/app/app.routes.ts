import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {ProfileComponent} from "./profile/profile.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {authGuard} from "./guards/auth.guard";
import {TicTacToeComponent} from "./tic-tac-toe/tic-tac-toe.component";
import {FormComponent} from "./form/form.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'dashboard', loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent)},
      {path: 'settings', component: SettingsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'game', loadComponent: () =>
          import('./tic-tac-toe/tic-tac-toe.component').then(m => m.TicTacToeComponent)},
      {path: 'form', component: FormComponent}
    ],
    // canActivate: [authGuard]
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {SigninComponent} from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './auth/auth.guard';
import {ActivityRequestComponent} from './components/activity-request/activity-request.component';
import {ProfileComponent} from './components/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin',           component: SigninComponent },
  { path: 'register',         component: RegisterComponent },
  { path: 'home',             component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile',          component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages',         component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'activityRequest',  component: ActivityRequestComponent, canActivate: [AuthGuard] },

  { path: '**', pathMatch: 'full', redirectTo: 'signin' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  })

export class AppRoutingModule {}

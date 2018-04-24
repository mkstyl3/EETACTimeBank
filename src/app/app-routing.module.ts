import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {SigninComponent} from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './auth.guard';
import {ActivityRequestComponent} from './components/activity-request/activity-request.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin',           component: SigninComponent },
  { path: 'register',         component: RegisterComponent },
  { path: 'home',             component: HomeComponent },
  { path: 'activityRequest',  component: ActivityRequestComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'signin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

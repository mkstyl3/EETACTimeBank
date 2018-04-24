import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {SigninComponent} from './signin/signin.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
  { path: '**', pathMatch: 'full', redirectTo: 'signin'}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

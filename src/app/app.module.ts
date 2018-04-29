import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr';
import {SigninComponent} from './components/signin/signin.component';
import {UserService} from './service/user.service';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth.guard';
import { ActivityRequestComponent } from './components/activity-request/activity-request.component';
import { HeaderComponent } from './components/header/header.component';
import { ActivityComponent } from './components/activity/activity.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    ActivityRequestComponent,
    HeaderComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr';
import {SigninComponent} from './signin/signin.component';
import {UserService} from './service/user.service';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    
      
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

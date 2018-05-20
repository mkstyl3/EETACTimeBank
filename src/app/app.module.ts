import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { SigninComponent } from './components/signin/signin.component';
import { UserService } from './service/user.service';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SidebarComponent } from './components/messages/components/sidebar/sidebar.component';
import { AuthGuard } from './auth/auth.guard';
import { ActivityRequestComponent } from './components/activity-request/activity-request.component';
import { HeaderComponent } from './components/header/header.component';
import { ActivityComponent } from './components/activity/activity.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent} from './components/profile/profile.component';
import { ConversationComponent } from './components/messages/components/conversation/conversation.component';
import { SendMessageComponent } from './components/messages/components/send-message/send-message.component';
import { APIInterceptor } from './interceptors/api.interceptor';
import { AuthService } from './service/auth.service';
import { AgmCoreModule } from '@agm/core';
import { TableActivityRequestComponent } from './components/table-activity-request/table-activity-request.component';
import {UserChatService} from './service/user.chat.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { ImageuploadComponent } from './components/imageupload/imageupload.component';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    MessagesComponent,
    SidebarComponent,
    ActivityRequestComponent,
    ConversationComponent,
    HeaderComponent,
    SendMessageComponent,
    HeaderComponent,
    ActivityComponent,
    ProfileComponent,
    TableActivityRequestComponent,
    ImageuploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD4btF6um1qmUt7IZDVsU8WlWI6-PMYZk0' })
  ],
  providers: [UserService, AuthGuard, UserChatService, ToastrService,
    AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

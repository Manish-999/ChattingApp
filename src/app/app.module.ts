import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import {ChatCallService} from './service/chat-call.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntroductionComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ChatCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }

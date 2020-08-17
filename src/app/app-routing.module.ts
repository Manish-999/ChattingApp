import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {IntroductionComponent} from './components/introduction/introduction.component'
import {ChatRoomComponent} from './components/chat-room/chat-room.component'


const routes: Routes = [
  { path:"",redirectTo:'/intro',pathMatch:'full'},
  { path:"login",pathMatch:'full',component:LoginComponent},
  { path:"intro",pathMatch:'full',component:IntroductionComponent},
  { path:"chat/:name/:room",pathMatch:'full',component:ChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

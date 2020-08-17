import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  enterIn(e,name,room){
    e.preventDefault()
    console.log(!name.value,!room.value)
    if(!name.value || !room.value){
      return console.log('some error',name.value,room.value)
    }
    this.route.navigate([`/chat/${name.value}/${room.value}`]) //Redirecting to another URL
  }
}

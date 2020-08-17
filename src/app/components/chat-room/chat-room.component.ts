import { Component, OnInit } from '@angular/core';
import { ChatCallService } from '../../service/chat-call.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'


import{chatStructure} from '../../models/chatStructure'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent implements OnInit {



  name
  room
  names
  chatting: chatStructure[] = []
  input
  inpo


  constructor(private chat: ChatCallService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name')
      this.room = params.get('room')
      console.log(this.name, this.room)
    })

    this.chat.connect(this.name, this.room).subscribe(
      data => {
        console.log('data received')
      },
      err => {
        console.log('we got some errors')
      }
    )

    this.chat.messageComes().subscribe(
      msg => {
        console.log('Message come', msg)
        this.chatting.push(msg)
        console.log(this.chatting)

        var chatHistory = document.getElementById("scrollBottom");
        setTimeout(function(){ chatHistory.scrollTop = chatHistory.scrollHeight; }, 250);
        

      },
      err => {
        console.log('Error occur in receiving data', err)
      }
    )

    this.chat.updateUserList().subscribe(
      names => {
        console.log('User List', names)
        this.names = names
      },
      err => {
        console.log('some error in updating userList', err)
      }
    )

    this.input = document.getElementById("myInput");
    
  this.input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      console.log('hello',event.keyCode)
      // event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("myBtn").click();
      // document.getElementById("myInput").value=""
      this.inpo=''
      
    }
  });


  }
  sendMessage(data) {
    this.chat.messageEmit(data);
    this.inpo=''
  }
  

}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class ChatCallService {

	socket

	constructor() {
		this.socket = io()
	}


	connect(name, room) {  //execute on when User enter data for join
		return Observable.create(observe => {


			this.socket.on('connect', () => {
				console.log('connected to server')
				let data = {
					name: name,
					room: room
				}
				this.socket.emit('join', data, (err) => {
					if (err) {
						alert(err)
						window.location.href = '/login'
					} else {
						console.log('no error')
					}
				})
			})

		})
	}

	messageComes() {  //execute when Msg Comes from server
		return Observable.create(observe => {
			this.socket.on('newMessage', (msg) => {
				let formateTime = moment(msg.createdAt).format('LT')
				console.log("message come form server-->",msg)
				let data={
					text:msg.text,
					time:formateTime,
					from:msg.from
				}
				observe.next(data)
			})
		})
	}

	messageEmit(data){ //Sending message to server
		this.socket.emit('createMessage',data);
	}

	updateUserList(){ //For Getting updated active user list
		return Observable.create(observe=>{
			this.socket.on('updateUserList',data=>{
				observe.next(data)
			})
		})
	}
}
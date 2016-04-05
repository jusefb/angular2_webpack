import {Component, Input} from "angular2/core";
import {Message, User} from "../models";
import {UserService} from "../services/UserService";
import {FromNowPipe} from "../util/FromNowPipe";
@Component({
    selector: "chat-message",
    pipes: [FromNowPipe],
    template: `
    <div class="msg-container"
        [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">

     <div class="avatar"
          *ngIf="!incoming">
       <img src="{{message.author.avatarSrc}}">
     </div>

     <div class="messages"
       [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
       <p>{{message.text}}</p>
       <time>{{message.sender}} • {{message.sentAt | fromNow}}</time>
     </div>

     <div class="avatar"
          *ngIf="incoming">
       <img src="{{message.author.avatarSrc}}">
     </div>
   </div>
    `
})
export class ChatMessage {
    @Input() message:Message;
    currentUser:User;
    incoming:boolean;

    constructor(public userService:UserService) {
    }

    ngOnInit():void {
        this.userService.currentUser.subscribe(
            (user:User) => {
                this.currentUser = user;
                if (this.message && this.message.author && user) {
                    this.incoming = this.message.author.id !== user.id;
                }
            });
    }

}
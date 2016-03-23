import {Component} from "angular2/core";
import {Thread} from "../models";
import {ThreadsService} from "../services/ThreadsService";

@Component({
    selector: 'chat-thread',
    inputs: ['thread'],
    template: `
    <div class="media conversation">
        <div class="pull-left">
          <img class="media-object avatar"
               src="{{thread.avatarSrc}}">
        </div>
        <div class="media-body">
          <h5 class="media-heading contact-name">{{thread.name}}
            <span *ngIf="selected">&bull;</span>
          </h5>
          <small class="message-preview">{{thread.lastMessage.text}}</small>
        </div>
        <a href (click)="clicked($event)" class="div-link">Select</a>
    </div>
    `
})
export class ChatThread {
    thread:Thread;
    selected:boolean = false;

    constructor(public threadsService:ThreadsService) {
    }

    ngOnInit():void {
        this.threadsService.currentThread
            .subscribe((currentThread:Thread) => {
                this.selected = currentThread &&
                    this.thread &&
                    (currentThread.id === this.thread.id);
            });
    }

    clicked(event:any):void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
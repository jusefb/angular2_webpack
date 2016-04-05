import {Component, ChangeDetectionStrategy} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "../services/ThreadsService";
import {ChatThread} from "./ChatThread";

@Component({
    selector: 'chat-threads',
    directives: [ChatThread],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
     <div class="row">
       <div class="conversation-wrap">
         <chat-thread
              *ngFor="#thread of threads | async"
              [thread]="thread">
         </chat-thread>
       </div>
     </div>
    `
})
export class ChatThreads {
    threads:Observable<any>;

    constructor(public threadsService:ThreadsService) {
        this.threads = threadsService.orderedThreads;
    }
}
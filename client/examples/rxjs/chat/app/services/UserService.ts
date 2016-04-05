
import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";

import {BehaviorSubject} from "rxjs/Rx";
import {User} from "../models";

@Injectable()
export class UserService{
    //Subjet is an rxjs class that acts and both the Observable and Observer
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    constructor(){

    }

    setCurrentUser(user: User){
        this.currentUser.next(user);
    }
}
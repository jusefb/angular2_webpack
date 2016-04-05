import {Message} from "../models";

export interface IMessagesOperation extends Function {
    (messages:Message[]): Message[];
}


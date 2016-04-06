import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {YouTubeSearchComponent, YouTubeService, youTubeServiceInjectables} from "./YouTubeSearchComponent";

@Component({
    selector: 'main-app',
    template: `
        <youtube-search></youtube-search>
    `,
    directives: [YouTubeSearchComponent]
})
export class YouTubeSearchApp {

}

bootstrap(YouTubeSearchApp, [youTubeServiceInjectables, YouTubeService, HTTP_PROVIDERS])
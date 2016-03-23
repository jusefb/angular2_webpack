import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {SimpleHttp} from "./SimpleHttp";

@Component({
    selector: 'main-app',
    template: `
        <simple-http></simple-http>
    `,
    directives:[SimpleHttp]
})
export class HttpApp {

}

bootstrap(HttpApp, HTTP_PROVIDERS)
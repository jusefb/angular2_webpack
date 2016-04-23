import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {MainApp} from "./components/app"

bootstrap(MainApp, HTTP_PROVIDERS);
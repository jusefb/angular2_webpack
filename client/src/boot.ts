import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {MainApp} from "./components/app"

bootstrap(MainApp, HTTP_PROVIDERS)
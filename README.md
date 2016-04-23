#Another Angular 2 + Webpack Starter Project

This is a starter project for using Angular 2 with Webpack on the client and Express Js on the server. I have set it up more for myself to learn how to use angular 2 but I thought it could be useful for others who are trying to get to the grips with how to use the new version of the wonderful Angularjs framework.

The app is an ExpressJS application. It has routes setup to get to the index page of the app and to manage HTML5 push state. I have deliberately separated the project src files into "client" and "server" folders so that the angualr part could be easily used in projects without express js.

The application uses npm for all package management

Please note that this project is using Typescript on the client and server. Again this can be easily changed if required.

The starter project has also been configured for Client unit test, server unit tests and e2e tests of the app usign protractor.

I am planning to try various available tutorials (like The Tour of Heroes) and publish the examples here. All of the tutorials that I have gone through are available in the examples directory. I thought it will be usefull to include this here just to allow to pickup some code samples quickly.

I would like to thanks the creators of the [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) project for the inspiration and a good webpack + angular 2 example. I would also like to metnion the followign great sources of information on Angualr 2:

[ng-book2](https://www.ng-book.com/2/)
[Angular Docs](https://angular.io/docs/js/latest/)

#Setup and Installation Guide

- Clone this repository
- Run 'npm init', this will download all the nesseccary dependancies and install all the required typings
- Run 'npm run serve' 
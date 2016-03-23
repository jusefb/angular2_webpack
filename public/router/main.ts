import {Component, OnInit} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';
import {RouteConfig, ROUTER_PROVIDERS, RouteParams} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'home',
    template: `<p>Welcome!</p>`
})
class HomeComponent{

}

@Component({
    selector: 'about',
    template: `<p>About Us</p>`
})
class AboutComponent{

}

@Component({
    selector: 'contact',
    template: `<p>Contact Us</p>`
})
class ContactComponent{

}

@Component({
    selector: 'artist',
    template: `<p>Contact Us {{artistId}}</p>`
})
class ArtistComponent implements OnInit{
    artistId;

    constructor(private _routeParams: RouteParams){

    }

    ngOnInit():any {
        this.artistId = this._routeParams.get('id');
    }
}

@Component({
    selector: 'product-main',
    directives:[ROUTER_DIRECTIVES],
    template: `
        <p>THis is the Main Component</p>
    `
})
class MainComponent{

}

@Component({
    selector: 'product-byid',
    template: `
        <p>Nested by ID</p>
    `
})
class ByIdComponent{

}

@Component({
    selector: 'products',
    directives:[ROUTER_DIRECTIVES],
    template: `
        <h1>Products</h1>
        <a [routerLink]="['./Main']">Main</a> |
        <a [routerLink]="['./ById', {id: 1}]">Id 1</a>
        <router-outlet></router-outlet>
    `
})
@RouteConfig([
    {path: '/main', name: 'Main', component: MainComponent, useAsDefault: true},
    {path: '/:id', name: 'ById', component: ByIdComponent},
])
class ProductsComponent implements OnInit {
    ngOnInit():any {

    }
}

@Component({
    selector: 'main-app',
    directives:[ROUTER_DIRECTIVES],
    template: `
     <div>
     <nav>
       <a>Navigation:</a>
       <ul>
         <li><a [routerLink]="['/Home']">Home</a></li>
         <li><a [routerLink]="['/About']">About</a></li>
         <li><a [routerLink]="['/Contact']">Contact us</a></li>
         <li><a [routerLink]="['/Artists', {id: 1}]">Artist 1</a></li>
         <li><a [routerLink]="['/Artists', {id: 2}]">Artist 2</a></li>
         <li><a [routerLink]="['/Products', {id: 2}]">Products</a></li>
       </ul>
     </nav>
 
     <router-outlet></router-outlet>
   </div>
    `
})
@RouteConfig([
    {path: '/', name: 'root', redirectTo: ['/Home']},
    {path: '/home', name: 'Home', component: HomeComponent},
    {path: '/about', name: 'About', component: AboutComponent},
    {path: '/contact', name: 'Contact', component: ContactComponent},
    {path: '/contactus', name: 'ContactUs', redirectTo: ['/Contact']},
    { path: '/artists/:id', name: 'Artists', component: ArtistComponent },
    { path: '/products/...', name: 'Products', component: ProductsComponent }

])
export class RouterApp{

}

bootstrap(RouterApp, [ROUTER_PROVIDERS]);
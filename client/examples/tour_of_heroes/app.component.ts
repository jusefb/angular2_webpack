import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {HeroService} from "./hero.service.ts";
import {HeroComponent} from "./hero.component.ts";
import {HeroDetailComponent} from "./hero-detail.component.ts";
import {DashboardComponent} from "./dashboard.component.ts";

@Component({
    selector: 'main-app',
    template:`
        <h1>{{title}}</h1>
            <nav>
                <a [routerLink]="['Dashboard']">Dashboard</a>
                <a [routerLink]="['Heroes']">Heroes</a>
            </nav>
        <router-outlet></router-outlet>
    `,
    providers: [HeroService, ROUTER_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/heroes', name: 'Heroes', component: HeroComponent},
    {path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent}
])
export class AppComponent{
    public title = 'Tour of Heroes';
}


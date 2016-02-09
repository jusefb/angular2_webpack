import {Component} from 'angular2/core';
import {Hero} from "./hero";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router'
import {HeroService} from "./hero.service"

@Component({
    selector: 'my-hero-detail',
    template: `
    <div>
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <div><input [(ngModel)]="hero.name" placeholder="name"></div>
      </div>
      </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    inputs: ['hero']
})
export class HeroDetailComponent {
    public hero: Hero;

    constructor(private _routeParams: RouteParams, private _heroService: HeroService){
        _heroService.getHero(_routeParams.get('id')).then((hero: Hero) => {
            console.log(hero);
            this.hero = hero;
        });
    }

}
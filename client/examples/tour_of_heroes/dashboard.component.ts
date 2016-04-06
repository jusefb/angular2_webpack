import {Component} from 'angular2/core'
import {Hero} from "./hero";
import {HeroService} from "./hero.service.ts";
import {Router} from "angular2/router";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'tour_of_heroes/dashboard.component.html',
    styleUrls: ['tour_of_heroes/dashboard.component.css']
})
export class DashboardComponent{
    public heroes: Hero[] = [];

    constructor(private _heroService: HeroService, private _router: Router) { }

    ngOnInit() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
    }

    gotoDetail(hero: Hero) {
        this._router.navigate(['HeroDetail', {id: hero.id}]);
    }

}
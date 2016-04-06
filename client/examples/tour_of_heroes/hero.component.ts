import {Component} from 'angular2/core'
import {Hero} from "./hero";
import {HeroDetailComponent} from './hero-detail.component.ts';
import {HeroService} from './hero.service.ts';
import {OnInit} from 'angular2/core';

@Component({
    selector: 'my-heroes',
    template: `
      <h2>My Heroes</h2>
        <ul class="heroes" *ngIf="heroes.length > 0">
          <li
            *ngFor="#hero of heroes"
            (click)="onSelect(hero)"
            [class.selected]="hero === selectedHero">
              <span class="badge">{{hero.id}}</span> {{hero.name}}
          </li>
        </ul>
        <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
    styles:[`
  .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
  .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
  .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
  .heroes .badge {
    font-size: small;
    color: white;
    padding: 0.1em 0.7em;
    background-color: #369;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -1px;
  }
  .selected { background-color: #EEE; color: #369; }
`],
    directives: [HeroDetailComponent]
})
export class HeroComponent implements OnInit{

    public selectedHero: Hero;
    public heroes: Hero[] = [];

    constructor(private _heroService: HeroService) {
        this.selectedHero = {
            id: null,
            name: ''
        };
    }

    ngOnInit():any {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);

    }

    onSelect(hero){
        console.log(hero);
        this.selectedHero = hero;
    }

}
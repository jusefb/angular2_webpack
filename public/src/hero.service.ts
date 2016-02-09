import {HEROES} from './mock-heroes';
import {Injectable} from "angular2/core"
import {resolve} from "url";

@Injectable()
export class HeroService{
    getHeroes(){
        return Promise.resolve(HEROES);
    }

    // See the "Take it slow" appendix
    getHeroesSlowly() {
        return new Promise(resolve =>
            setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
        );
    }

    getHero(id){
        return new Promise(resolve => {
            var heroes = HEROES.filter((hero) => {
                return hero.id === parseInt(id);
            });

            if(heroes.length > 0)
                resolve(heroes[0]);
            else
                resolve(null);
        });
    }
}
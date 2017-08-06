import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  shuffleHeroes(): Promise<Hero[]> {
    let temp_arr = HEROES;
    let currentIndex = temp_arr.length, tempValue, randomIndex;

    // while there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it whit the current element;
      tempValue = temp_arr[currentIndex];
      temp_arr[currentIndex] = temp_arr[randomIndex];
      temp_arr[randomIndex] = tempValue;
    }
    return Promise.resolve(temp_arr);
  }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 5 second delay
      setTimeout(() => resolve(this.getHeroes()), 5000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  } 
}
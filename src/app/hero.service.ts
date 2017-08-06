import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes'; // URL to web api
  private testUrl = "api/test";

  constructor(
    private http: Http
  ) { }

  getTest(): Promise<string> {
    return this.http.get(this.testUrl)
      .toPromise()
      .then(res => res.json().data as string)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 5 second delay
      setTimeout(() => resolve(this.getHeroes()), 5000);
    });
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // deprecated => do it in dashboard.component.ts
  // shuffleHeroes(): Promise<Hero[]> {
  //   let temp_arr;
  //   let currentIndex, tempValue, randomIndex;

  //   this.getHeroes()
  //       .then((heroes) => {
  //         temp_arr = heroes
  //         currentIndex = temp_arr.length;
  //       });
    
  //   // while there remain elements to shuffle
  //   while (0 !== currentIndex && currentIndex === undefined) {
  //     // Pick a remaining element
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // and swap it whit the current element;
  //     tempValue = temp_arr[currentIndex];
  //     temp_arr[currentIndex] = temp_arr[randomIndex];
  //     temp_arr[randomIndex] = tempValue;
  //   }
  //   return Promise.resolve(temp_arr);
  // }
}
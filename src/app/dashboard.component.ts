import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getTest()
      .then(data => console.log(data));

    this.heroService.getHeroes()
      .then((data_arr) => {
        let temp_arr = data_arr;
        let currentIndex, tempValue, randomIndex;
        currentIndex = temp_arr.length;
        while (0 !== currentIndex && currentIndex === undefined) {
          // Pick a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // and swap it whit the current element;
          tempValue = temp_arr[currentIndex];
          temp_arr[currentIndex] = temp_arr[randomIndex];
          temp_arr[randomIndex] = tempValue;
        }
        this.heroes = temp_arr.slice(1,5);
      });
  }
}
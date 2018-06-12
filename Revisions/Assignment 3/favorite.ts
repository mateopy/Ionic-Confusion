import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;

  constructor(
    public http: HttpClient,
    private dishService: DishProvider,
    private storage: Storage
  ) {
    console.log('Hello FavoriteProvider Provider');
    storage.get('favorites').then((favorites) => {
      if (favorites) {
        this.favorites = favorites;
        console.log(this.favorites);
      } else {
        this.favorites = [];
        console.log('no favorites found');
      }
    });
    console.log('end loading favorites provider');
  }

  addFavorite(id: number): boolean {
    console.log("hello, add favorite");
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.remove('favorites');
      this.storage.set('favorites', this.favorites);
    }
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
    console.log("is favorite");
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    console.log("get favorites");
    return this.dishService.getDishes()
      .map(dishes =>
        dishes.filter(dish =>
          this.favorites.some(el => el === dish.id)
        )
      );
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    console.log("delete favorite");
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.remove('favorites');
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

}
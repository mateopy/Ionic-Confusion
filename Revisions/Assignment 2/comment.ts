import { Dish } from './../../shared/dish';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishdetailPage } from '../dishdetail/dishdetail';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  myRating: number=5;
  dish: Dish;
  
  private yourComment: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public viewCtrl: ViewController,
     private formBuilder: FormBuilder
	 
    ) {
      this.dish = navParams.get('dish');
      this.yourComment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comments: ['', Validators.required],
        date: new Date().toISOString()
      }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    
  }
  
  addComment() {
    this.viewCtrl.dismiss(this.yourComment);
  }

}

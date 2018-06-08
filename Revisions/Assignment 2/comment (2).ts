import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Dish } from '../../app/shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../../pages/dishdetail/dishdetail';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
 
})
export class CommentsPage {
  comment: FormGroup;
  dish:Dish;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController ,private formBuilder: FormBuilder, private dishProvider:DishProvider, public modalCtrl: ModalController) {
      this.comment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 2,
        comment: ['',Validators.required],
		date: new Date().toISOString()
      
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
  onSubmit() {
    this.viewCtrl.dismiss(this.comment);
  }
}

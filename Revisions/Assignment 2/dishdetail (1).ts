import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { CommentPage } from '../comment/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  addToFavorites() {
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  openComment() {

    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(
      data => {
      if(data){
        data.value.date=new Date();
        this.dish.comments.push(data.value)
        this.numcomments++;
      }
     
 });
    modal.present();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },{
          text: 'Add Comment',
          handler: () => {
            this.openComment();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
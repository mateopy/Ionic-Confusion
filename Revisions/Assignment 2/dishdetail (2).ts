import { Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ActionSheetController,ModalController } from 'ionic-angular';
import { Dish } from '../../app/shared/dish';
import { Comment } from '../../app/shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentsPage } from '../comments/comments';


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
export class DishdetailPage{
  dish:Dish;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
     public modalCtrl: ModalController) {
    this.dish = navParams.get('dish'),
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }
  openComment() {

    let modal = this.modalCtrl.create(CommentsPage);
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
  openActionsheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          role: 'add fav',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          role: 'add comm',
          handler: () => {
            
           this.openComment();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           
          }
        }
      ]
    });
    actionSheet.present();
  }
  
}
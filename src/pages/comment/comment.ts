import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

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
  commentForm: FormGroup;
  comment:Comment;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, private formBuilder: FormBuilder) {
      this.commentForm = this.formBuilder.group({
        rating: [3, Validators.required],
        author: ['', Validators.required],
        comment: ['', Validators.required],
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    var d = new Date().toISOString();
    this.comment = this.commentForm.value;
    this.comment.date = d;
    console.log(this.comment);
    this.viewCtrl.dismiss(this.comment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}

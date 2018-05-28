import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../app/app.service';
import { AppSetting } from '../../app/app.setting';

@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html'
})
export class AboutusPage {

  baseUrl: string = AppSetting.BASE_URL;  
  leadership: any;
  
  constructor(public navCtrl: NavController, public appService: AppService) {

  }

  ngOnInit(){
    this.appService.getLeadership()
      .subscribe(
        data => this.leadership = data,
        error => console.error('Error: ' + error),
      );
  }

}
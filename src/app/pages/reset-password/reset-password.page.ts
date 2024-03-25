import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { GamerService } from 'src/app/Service/gamer.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = '';
  errorMessage: string = '';
  acceptanceMessage: string = '';
  loading: Promise<HTMLIonLoadingElement>;

  constructor(private http: HttpClient, private gamerService: GamerService, private navCtrl: NavController, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({message: "Account wird erstellt..."})
  }

  ngOnInit() {}

  async sendEmailForNewPassword() {
    this.errorMessage = '';
    this.acceptanceMessage = '';

    if (this.email == '') {
      this.errorMessage = "Bitte geben Sie eine Email ein";
    }
    else {
      await (await this.loading).present();
      await this.gamerService.forgot_password(this.email).subscribe({
        next: response=>this.password_changed(response),
        error: error_reponse=>this.user_not_found(error_reponse) 
      }); 
    }
    this.email = '';
  }

  async password_changed(response: any) {
    await (await this.loading).dismiss();
    this.acceptanceMessage = "Checken Sie ihr Email Posfach für weitere Informationen";
  }
  
  async user_not_found(error_reponse: any) {
    await (await this.loading).dismiss();
    this.errorMessage = "Diese Email existiert nicht";
  }

  resetAllMessages() {
    this.email = "";
    this.acceptanceMessage = "";
    this.errorMessage = "";
  }
  

}

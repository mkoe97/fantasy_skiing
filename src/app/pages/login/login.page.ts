import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { GamerService } from 'src/app/Service/gamer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username_email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: Promise<HTMLIonLoadingElement>;

  constructor(private http: HttpClient, private gamerService: GamerService, private navCtrl: NavController, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({message: "Logging in..."})
  }

  ngOnInit() {

  }

  async checkCredentials() {
    if (this.username_email == '') {
      this.errorMessage = 'Bitte geben Sie einen Usernamen oder eine Email ein';
    }
    else if (this.password == '') {
      this.errorMessage = "Bitte geben Sie ein Passwort ein";
    }
    else {
      await (await this.loading).present();
      await this.gamerService.readGamerByCredentials(this.username_email, this.password).subscribe({
        next: response=>this.loginGranted(response),
        error: error_reponse=>this.loginNotGranted(error_reponse) 
      }); 
    }
  }

  async loginNotGranted(error_reponse: any) {
    this.errorMessage = "Benutzername/Email oder Passwort ungültig"
    await (await this.loading).dismiss();
  }

  async loginGranted(response: any) {
    await (await this.loading).dismiss();
    this.navCtrl.navigateRoot('/home')
  }

}

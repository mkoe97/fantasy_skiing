import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamerService } from 'src/app/Service/gamer.service';
import { NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordwh: string = '';
  errorMessage: string = '';
  loading: Promise<HTMLIonLoadingElement>;

  constructor(private http: HttpClient, private gamerService: GamerService, private navCtrl: NavController, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({message: "Account wird erstellt..."})
  }

  ngOnInit() {
  }

  async createGamer() {
    if (this.username == '') {
      this.errorMessage = 'Bitte geben Sie einen Usernamen ein';
    }
    else if (this.email == '') {
      this.errorMessage = "Bitte geben Sie eine Email ein";
    }
    else if (this.password == '') {
      this.errorMessage = "Bitte geben Sie ein Passwort ein";
    }
    else if (this.password.length < 8) {
      this.errorMessage = "Passwort ist zu kurz (zumidest 8 Zeichen)";
    }
    else if (this.password != this.passwordwh) {
      this.errorMessage = "Die angegebenen Passwörter passen nicht überein";
    }
    else {
      await (await this.loading).present();
      await this.gamerService.createGamer(this.email, this.username, this.password).subscribe({
        next: response=>this.gamerCreated(response),
        error: error_reponse=>this.gamerNotCreated(error_reponse) 
      }); 
    }

  }

  async gamerCreated(response: any) {
    await (await this.loading).dismiss();
    this.navCtrl.navigateRoot('/home')
  }

  async gamerNotCreated(error_response: any) {
    this.errorMessage = "Dieser Benutzername oder Email existiert bereits"
    await (await this.loading).dismiss();
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {AuthService} from "../services/auth.service";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, apiService: ApiService, private router: Router, private alertCtrl: AlertController) { }

  canActivate(route: ActivatedRouteSnapshot) {

    // @ts-ignore
    const expectedRole: string = route.data?.role || '';

    return this.authService.getUser().then(user  => {
        if (!user) {
          this.showAlert();
          return this.router.parseUrl('/')
        } else {
          let role = user['roles'];
          if (!expectedRole || role?.find(role => role == expectedRole)) {
            return true;
          } else {
            this.showAlert();
            return false;
          }
        }
      })
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Não Autorizado',
      message: 'Você não está autorizado a visitar essa página!',
      buttons: ['OK']
    });
    alert.present();
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
 credenciais: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { this.credenciais = this.fb.group({
    login: ['', Validators.required],
    senha: ['', Validators.required]
  })}

  async ngOnInit() {
   await this.apiService.loadToken();
    if(this.apiService.currentAccessToken) {
        this.router.navigate(['./home']);
    }
  }

  async login() {
    const loading  = await  this.loadingController.create();
    await loading.present();

    this.apiService.login(this.credenciais.value).subscribe(
      async () => {
        var sim = await this.apiService.loadToken();
        await loading.dismiss();
        this.router.navigateByUrl('/home', {replaceUrl: true})
      },
      async (res: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Falha ao realizar o login',
          message: res?.error?.msg,
          buttons: ['OK'],
        })
        await alert.present();
      }
    );
  }
}

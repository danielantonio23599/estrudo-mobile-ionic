import {Component, OnChanges, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import {Roles} from "./util/roles";
import {JwtPayload} from "./model/jwt-payload";
import {ApiService} from "./services/api.service";
import {Platform} from "@ionic/angular";
import {async} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  isDesktop: boolean;
  isTablet: boolean;
  versao = '';
  public appPages = [
    { title: 'Minha conta', url: '/account', permissao: Roles.ROLE_ACESSO_SISTEMA, icon: 'home' },
    { title: 'Permissoes', url: '/permissoes', permissao: Roles.ROLE_CONCEDER_PERMISSAO, icon: 'settings' },
    { title: 'Usuarios', url: '/usuarios', permissao: Roles.ROLE_CADASTRO_USUARIO, icon: 'people' },
  ];
  user: JwtPayload = {};
  constructor(private storage: Storage,private platform: Platform, protected apiService: ApiService) {
    this.isDesktop = platform.is('desktop');
    this.isTablet = platform.is('tablet');
  }

  async ngOnInit() {
    this.storage.create();
    this.user = await this.storage.get('user');
  }
  async ngOnChanges(){
    this.storage.create();
    this.user = await this.storage.get('user');
  }
  async logout() {
    await this.apiService.logout();
  }
}

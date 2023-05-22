import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PerfilModel} from "../../../model/perfil.model";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {ApiService} from "../../../services/api.service";
import {Roles} from "../../../util/roles";
import {trackById} from "../../../util/track-by-fn";

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.page.html'
})
export class PermissaoPage {

  protected readonly Roles = Roles;
  perfil: FormGroup;
  protected trackById = trackById;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private alertCtrl: AlertController,
              private apiService: ApiService) {
    this.perfil = this.fb.group({
      id:[null],
      nome: ['', Validators.required],
    });
  }

  cadastrar(){
    this.apiService.cadastrarPerfil(this.perfil.value).subscribe(user =>{
      this.showAlert("Sucesso!", `A permissão ${user.nome} foi cadastrado com sucesso!`)
    },err =>{
      this.showAlert("Não foi possivel cadastrar a nova permissão", err)
    });
  }

  async showAlert(titulo: string, mensagem: string ) {
    let alert = await this.alertCtrl.create({
      header: `${titulo}`,
      message: `${mensagem}`,
      buttons: ['OK']
    });
    alert.present();
  }

}

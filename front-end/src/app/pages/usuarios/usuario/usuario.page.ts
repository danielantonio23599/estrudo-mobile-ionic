import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {PerfilModel} from "../../../model/perfil.model";
import {Roles} from "../../../util/roles";
import {ActivatedRoute} from "@angular/router";
import {trackById} from "../../../util/track-by-fn";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
})
export class UsuarioPage implements OnInit {

  protected readonly Roles = Roles;
  usuario: FormGroup;
  permissoes: PerfilModel[] = [];
  protected trackById = trackById;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private alertCtrl: AlertController,
              private apiService: ApiService) {
    this.usuario = this.fb.group({
      id:[null],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['',Validators.required],
      perfis: [null],
    });
  }

  ngOnInit() {
    this.buscarPermissoes();

  }

  cadastrar(){
    this.apiService.cadastrarUsuario(this.usuario.value).subscribe(user =>{
      this.showAlert("Sucesso!", `Usuario ${user.nome} foi cadastrado com sucesso!`)
    },err =>{
        this.showAlert("Não foi possivel cadastrar o usuario", err)
    });
  }
  buscarPermissoes(){
    this.apiService.findAllPerfis().subscribe( res=>{
      this.permissoes = res;
      let id = null;
      this.route.paramMap.subscribe(params => {
        id = params.get('id');
        this.buscarUsuario(id);
      });
    })
  }

  buscarUsuario(id: string| null){
    if(id){
      this.apiService.findUsuarioById(id).subscribe( res =>{
        this.usuario.patchValue(res);
      });
    }
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

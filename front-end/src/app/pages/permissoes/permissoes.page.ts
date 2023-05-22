import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from "../../model/usuario.model";
import {ApiService} from "../../services/api.service";
import {PerfilModel} from "../../model/perfil.model";

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.page.html',
  styleUrls: ['./permissoes.page.scss'],
})
export class PermissoesPage implements OnInit {
  public data: PerfilModel[] = [];
  public results: PerfilModel[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.buscarPermissoes()
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
  }

  private buscarPermissoes(){
    this.apiService.findAllPerfis().subscribe( users =>{
      this.data = users;
      this.results = this.data;
    })
  }
}

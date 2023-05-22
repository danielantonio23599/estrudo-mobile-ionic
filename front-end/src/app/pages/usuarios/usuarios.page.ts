import {Component, OnInit} from '@angular/core';
import {UsuarioModel} from "../../model/usuario.model";
import {ApiService} from "../../services/api.service";
import {trackById} from "../../util/track-by-fn";
import {PerfilModel} from "../../model/perfil.model";
import {Roles} from "../../util/roles";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  public data: UsuarioModel[] = [];
  public results: UsuarioModel[] = [];
  protected readonly trackById = trackById;
  permissoes: PerfilModel[] =[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.buscarPermissoes();
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
  }

  private buscarUsuarios(){
    this.apiService.findAllUsuarios().subscribe( users =>{
      this.data = users;
      this.results = this.data;
    })
  }

  buscarPermissoes(){
    this.apiService.findAllPerfis().subscribe( res=>{
      this.permissoes = res;
      this.buscarUsuarios();
    })
  }

  protected readonly Roles = Roles;
}

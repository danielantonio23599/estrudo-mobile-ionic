import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';
import {AuthGuard} from "../../guards/auth.guard";
import {Roles} from "../../util/roles";

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_CADASTRO_USUARIO}
  },
  {
    path: 'usuario/:id',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_CADASTRO_USUARIO}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}

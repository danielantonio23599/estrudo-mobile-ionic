import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissoesPage } from './permissoes.page';
import {AuthGuard} from "../../guards/auth.guard";
import {Roles} from "../../util/roles";

const routes: Routes = [
  {
    path: '',
    component: PermissoesPage
  },
  {
    path: 'permissao',
    loadChildren: () => import('./permissao/permissao.module').then( m => m.PermissaoPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_CADASTRO_PERFIL}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissaoPageRoutingModule {}

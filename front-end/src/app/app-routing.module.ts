import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {Roles} from "./util/roles";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_ACESSO_SISTEMA}
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuarioPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_LISTAGEM_USUARIO}
  },
  {
    path: 'permissoes',
    loadChildren: () => import('./pages/permissoes/permissoes.module').then(m => m.PermissaoPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_CONCEDER_PERMISSAO}
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard],
    data: {role: Roles.ROLE_ACESSO_SISTEMA}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

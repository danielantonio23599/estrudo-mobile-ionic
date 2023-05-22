import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissaoPage } from './permissao.page';

const routes: Routes = [
  {
    path: '',
    component: PermissaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissaoPageRoutingModule {}

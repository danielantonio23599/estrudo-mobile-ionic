import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissaoPageRoutingModule } from './permissoes-routing.module';

import { PermissoesPage } from './permissoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissaoPageRoutingModule
  ],
  declarations: [PermissoesPage]
})
export class PermissaoPageModule {}

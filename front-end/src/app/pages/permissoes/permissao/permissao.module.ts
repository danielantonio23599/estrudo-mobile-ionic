import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissaoPageRoutingModule } from './permissao-routing.module';

import { PermissaoPage } from './permissao.page';
import {SharedDirectivesModule} from "../../../directives/shared-directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissaoPageRoutingModule,
    ReactiveFormsModule,
    SharedDirectivesModule
  ],
  declarations: [PermissaoPage]
})
export class PermissaoPageModule {}

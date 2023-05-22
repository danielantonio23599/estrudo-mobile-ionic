import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UsuarioPageRoutingModule} from './usuario-routing.module';

import {UsuarioPage} from './usuario.page';
import {SharedDirectivesModule} from "../../../directives/shared-directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPageRoutingModule,
    ReactiveFormsModule,
    SharedDirectivesModule
  ],
  declarations: [UsuarioPage]
})
export class UsuarioPageModule {}

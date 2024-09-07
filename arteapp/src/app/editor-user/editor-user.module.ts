import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorUserPageRoutingModule } from './editor-user-routing.module';

import { EditorUserPage } from './editor-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorUserPageRoutingModule
  ],
  declarations: [EditorUserPage]
})
export class EditorUserPageModule {}

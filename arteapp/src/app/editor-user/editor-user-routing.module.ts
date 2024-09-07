import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorUserPage } from './editor-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditorUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorUserPageRoutingModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { EventoModalComponent } from './evento-modal.component';

@NgModule({
  declarations: [EventoModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [EventoModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega esto aquí
})
export class EventoModalModule {}

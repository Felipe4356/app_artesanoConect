import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EventoModalModule } from '../app/evento-modal/evento-modal.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    EventoModalModule,  // Asegúrate de importar aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventoModalComponent } from '../evento-modal/evento-modal.component';
import { EventosService } from './eventos.service';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage {
  eventos: any[] = []; // Array para almacenar eventos

  constructor(
    private modalController: ModalController,
    private eventosService: EventosService
  ) {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventos = this.eventosService.getEventos(); // Asume que tienes un método para obtener eventos
  }

  async abrirModal(evento?: any) { // Especifica el tipo aquí
    const modal = await this.modalController.create({
      component: EventoModalComponent,
      componentProps: { evento }
    });

    modal.onDidDismiss().then(() => {
      this.cargarEventos(); // Recargar eventos después de cerrar el modal
    });

    return await modal.present();
  }

  editarEvento(evento: any) { // Especifica el tipo aquí también
    this.abrirModal(evento);
  }

  eliminarEvento(evento: any) { // Especifica el tipo aquí
    this.eventosService.eliminarEvento(evento.id); // Asume que tienes un método para eliminar eventos
    this.cargarEventos();
  }
}

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventosService } from '../eventos/eventos.service';

@Component({
  selector: 'app-evento-modal',
  templateUrl: './evento-modal.component.html',
  styleUrls: ['./evento-modal.component.scss'],
})
export class EventoModalComponent {
  @Input() evento: any; // Para recibir el evento que se va a editar

  titulo: string = '';
  subtitulo: string = '';
  descripcion: string = '';

  constructor(
    private modalController: ModalController,
    private eventosService: EventosService
  ) {}

  ngOnInit() {
    if (this.evento) {
      this.titulo = this.evento.titulo;
      this.subtitulo = this.evento.subtitulo;
      this.descripcion = this.evento.descripcion;
    }
  }

  guardarEvento() {
    const nuevoEvento = {
      titulo: this.titulo,
      subtitulo: this.subtitulo,
      descripcion: this.descripcion,
    };

    if (this.evento) {
      this.eventosService.editarEvento(this.evento.id, nuevoEvento);
    } else {
      this.eventosService.agregarEvento(nuevoEvento);
    }

    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

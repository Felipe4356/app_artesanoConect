import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private eventos: any[] = []; // Puedes usar una base de datos o API

  getEventos() {
    return this.eventos;
  }

  agregarEvento(evento: any) {
    this.eventos.push({ id: Date.now(), ...evento });
  }

  editarEvento(id: number, eventoActualizado: any) {
    const index = this.eventos.findIndex(e => e.id === id);
    if (index > -1) {
      this.eventos[index] = { id, ...eventoActualizado };
    }
  }

  eliminarEvento(id: number) {
    this.eventos = this.eventos.filter(evento => evento.id !== id);
  }
}

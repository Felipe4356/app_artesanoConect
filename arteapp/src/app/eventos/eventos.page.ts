import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/storagesql.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: any[] = [];  // Array para almacenar los eventos

  constructor(private local: localStorageService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.eventos = this.local.getAllEvents();
  }
}

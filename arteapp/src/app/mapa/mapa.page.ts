import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map!: Map;
  userMarker: any;

  constructor() {}

  ngOnInit() {
  
  }

 

 
}

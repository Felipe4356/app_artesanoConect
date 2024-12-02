import { Component, OnInit, OnDestroy } from '@angular/core';
import { Map, marker, tileLayer, icon,LatLng } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { localStorageService } from '../services/storagesql.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: Map;
  userMarker: any;
  coordinates: string = '';
  locations: any[] = [];
  user: any;

  customIcon = icon({
    iconUrl: 'assets/img/marcador-de-posicion.png', 
    
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });


  customIcon2 = icon({
    iconUrl: 'assets/img/puntero-del-mapa.png', // URL del icono por defecto
    
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  

  constructor(private local: localStorageService , private modalController: ModalController, ) {}

  ngOnInit() {
    this.initMap();
    this.loadLocations(); 
    this.user = this.local.getUser(); 

  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      console.log('Mapa destruido');
    }
  }

  initMap() {
    this.map = new Map('map').setView([-41.47077914182604, -72.92665716118523], 12);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  async showCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;

    this.map.setView([lat, lng], 15);

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    this.userMarker = marker([lat, lng], { icon: this.customIcon }).addTo(this.map)
      .bindPopup('Estás aquí')
      .openPopup();
  }

  
  addLocation() {
    if (!this.coordinates) {
      alert('Por favor, ingresa coordenadas en el formato "latitud, longitud".');
      return;
    }

    const [lat, lng] = this.coordinates.split(',').map(coord => parseFloat(coord.trim()));

    if (isNaN(lat) || isNaN(lng)) {
      alert('Las coordenadas no son válidas. Asegúrate de usar el formato "latitud, longitud".');
      return;
    }

    const location = new LatLng(lat, lng);
    const addedBy = this.user ? this.user.name : 'Desconocido';

    const newLocation = {
      id: Date.now().toString(),
      coordinates: this.coordinates,
      addedBy: addedBy,
    };

       this.addMarker(lat, lng, addedBy);

    this.map.setView(location, 13);

        this.local.saveLocation(newLocation);
    this.locations.push(newLocation);
    this.coordinates = '';
  }

 
  loadLocations() {
    this.locations = this.local.getAllLocations();
    this.locations.forEach(location => {
      const [lat, lng] = location.coordinates.split(',').map((coord: string) => parseFloat(coord.trim()));
      this.addMarker(lat, lng, location.addedBy);
    });
  }

 
  addMarker(lat: number, lng: number, addedBy: string) {
    marker([lat, lng], { icon: this.customIcon2 }) // Usar el icono personalizado
      .addTo(this.map)
      .bindPopup(`tienda de  ${addedBy}`)
      .openPopup();
  }

  
  async goToLocation(coordinates: string) {
    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    const location = new LatLng(lat, lng);
    this.map.setView(location, 13);
  
    const modal = await this.modalController.getTop();
    if (modal) { await modal.dismiss();
    }

    
  }
  

 
  reloadMap() {
    if (this.map) {
      this.map.remove();
      console.log('Mapa destruido');
    }
    this.initMap();
    this.loadLocations(); 
    this.showCurrentLocation();
   
  }
  
  deleteLocation(index: number) {
    const locationId = this.locations[index].id; 
    this.locations.splice(index, 1); 
    this.local.removeLocation(locationId); 
    this.reloadMap(); 
  }

  async closeModal() {
    const modal = await this.modalController.getTop(); 
    if (modal) {
      await modal.dismiss(); 
    }
  }
}
  


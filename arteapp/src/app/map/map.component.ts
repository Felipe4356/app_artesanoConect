import { Component, OnInit, OnDestroy } from '@angular/core';
import { Map, marker, tileLayer, icon,LatLng } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { localStorageService } from '../services/storagesql.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: Map;
  userMarker: any;
  coordinates: string = '';
  locations: any[] = []; // Lista de ubicaciones guardadas
  user: any;

  customIcon = icon({
    iconUrl: 'assets/img/marcador-de-posicion.png', // URL del icono por defecto
    
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });


  //agregar otro icono
  customIcon2 = icon({
    iconUrl: 'assets/img/puntero-del-mapa.png', // URL del icono por defecto
    
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  

  constructor(private local: localStorageService) {}

  ngOnInit() {
    this.initMap();
    this.loadLocations(); // Cargar ubicaciones guardadas al iniciar
    this.user = this.local.getUser(); // Obtener datos del usuario

  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      console.log('Mapa destruido');
    }
  }

  initMap() {
    this.map = new Map('map').setView([-41.48323252132218, -72.95893067652796], 12);
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

  // Método para agregar una ubicación ingresada manualmente
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

    // Usar el icono personalizado al agregar el marcador
    this.addMarker(lat, lng, addedBy);

    this.map.setView(location, 13);

    // Guardar en localStorage y actualizar la lista local
    this.local.saveLocation(newLocation);
    this.locations.push(newLocation);
    this.coordinates = '';
  }

  // Cargar ubicaciones guardadas desde localStorage
  loadLocations() {
    this.locations = this.local.getAllLocations();
    this.locations.forEach(location => {
      const [lat, lng] = location.coordinates.split(',').map((coord: string) => parseFloat(coord.trim()));
      this.addMarker(lat, lng, location.addedBy);
    });
  }

  // Método para agregar un marcador al mapa
  addMarker(lat: number, lng: number, addedBy: string) {
    marker([lat, lng], { icon: this.customIcon2 }) // Usar el icono personalizado
      .addTo(this.map)
      .bindPopup(`Ubicación guardada por ${addedBy}`)
      .openPopup();
  }

  // Navegar a una ubicación guardada en el mapa
  goToLocation(coordinates: string) {
    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    const location = new LatLng(lat, lng);
    this.map.setView(location, 13);
  }
  // Recargar el mapa
  reloadMap() {
    if (this.map) {
      this.map.remove();
      console.log('Mapa destruido');
    }
    this.initMap();
    this.loadLocations(); // Recarga también las ubicaciones guardadas
    this.showCurrentLocation(); // Muestra la ubicación actual al recargar
  }
  // Método para eliminar una ubicación guardada
  deleteLocation(index: number) {
    const locationId = this.locations[index].id; // Obtener el id de la ubicación
    this.locations.splice(index, 1); // Eliminar la ubicación de la lista local
    this.local.removeLocation(locationId); // Eliminar la ubicación del localStorage
    this.reloadMap(); // Recargar el mapa para reflejar los cambios
  }
}

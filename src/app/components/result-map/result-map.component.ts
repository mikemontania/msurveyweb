import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-result-map',
  templateUrl: './result-map.component.html',
  styleUrls: ['./result-map.component.css'],
  encapsulation: ViewEncapsulation.None // Agrega esta línea
})
export class ResultMapComponent {
  @Input() results: any[];
  @ViewChild('resultMap', { static: true }) resultMap!: ElementRef;
  mapLocation: { lat: number, lng: number };
  mapUrl: string;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.results && this.results.length > 0) {
      const firstResult = this.results[0];
      const locationData = firstResult.data;
      this.showLocationOnMap(locationData);
    } else {
      this.mapLocation = { lat: 0, lng: 0 };
    }
  }

  showLocationOnMap(locationData: string) {
    const parts = locationData.split(';');
    if (parts.length === 2) {
      const latPart = parts[0].split(':');
      const lngPart = parts[1].split(':');
      if (latPart.length === 2 && lngPart.length === 2) {
        const lat = parseFloat(latPart[1]);
        const lng = parseFloat(lngPart[1]);
        if (!isNaN(lat) && !isNaN(lng)) {
          this.mapLocation = { lat, lng };
          this.generateMapUrl(lat, lng);
          this.showMap();
        } else {
          console.error('Las coordenadas no son válidas.');
        }
      } else {
        console.error('Formato de datos incorrecto.');
      }
    } else {
      console.error('Formato de datos incorrecto.');
    }
  }

  private showMap() {
    if (typeof google === 'undefined') {
      console.error('La API de Google Maps no está cargada correctamente.');
      return;
    }

    const map = new google.maps.Map(this.resultMap.nativeElement, {
      center: this.mapLocation,
      zoom: 12
    });

    new google.maps.Marker({
      position: this.mapLocation,
      map: map
    });
  }

  exportToExcel() {
    if (!this.results || this.results.length === 0) {
      console.warn('No hay datos para exportar.');
      return;
    }

    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(this.results);
      XLSX.utils.book_append_sheet(wb, ws, 'Resultados');

      const fileName = 'resultados.xlsx';
      XLSX.writeFile(wb, fileName);

      this.success('Datos exportados exitosamente a Excel.');
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  }

  copyMapUrlToClipboard() {
    if (this.mapUrl) {
      const input = document.createElement('textarea');
      input.value = this.mapUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      this.success('URL del mapa copiada al portapapeles.');
    } else {
      console.warn('No hay URL del mapa para copiar.');
    }
  }

  private generateMapUrl(lat: number, lng: number) {
    this.mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  }

  private success(message: string) {
    this.toastr.success(message, 'Éxito', { timeOut: 2500 });
  }
}

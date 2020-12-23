import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GeoJsonObject } from 'geojson';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-map',
  template: `
    <div
      leaflet
      [leafletOptions]="options"
      (leafletMapReady)="onMapReady($event)"
      style="height: 500px; width: 400px;"
    >
      <div id="map"></div>
    </div>
  `,
  styles: [],
})
export class MapComponent implements OnInit, AfterViewInit {
  map: L.Map;

  bounds1 = L.latLng(42, 13);
  bounds2 = L.latLng(42, 12);
  options;
  public resGeojson: any;
  public resJson: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 5.5,
          minZoom: 5,
          attribution: '...',
        }),
      ],
      zoom: 5,
      center: L.latLng(42, 13),
      maxBounds: L.latLngBounds(this.bounds1, this.bounds2),
    };

    this.callServer().subscribe((res) => {
      this.resGeojson = res[0];
      this.resJson = res[1];
      console.log(res);

      if (
        this.resGeojson.features[0].properties.reg_name === this.resJson[0].name &&
        this.resJson[0].positive > 100
      ) {
        console.log('Zona rossa');
      }
      else {console.log("Zona gialla")}

    });
  }

  onMapReady(map: L.Map) {
    //chiamata all' url del geojson
    this.http
      .get(
        'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'
      )
      .subscribe((data: GeoJsonObject) => L.geoJSON().addTo(map));

    console.log;
  }

  ngAfterViewInit(): void {
    //console log della risposta
  }

  callServer(): any {
    //chiamata geojson
    let geojson = this.http.get(
      'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'
    );
    //chiamata json
    let json = this.http.get('http://localhost:3000/regione');

    return forkJoin([geojson, json]);
  }
}

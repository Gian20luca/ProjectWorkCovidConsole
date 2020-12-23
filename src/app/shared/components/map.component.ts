import { Component, OnInit } from '@angular/core';
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
    >
      <div id="map" style="height: 500px; width: 400px;"></div>
    </div>
    <button *ngIf="this.risposta" (click)="ShowAllPositive(this.risposta)">Mostra tutti i positivi</button>
  `,
  styles: [],
})
export class MapComponent implements OnInit {
  map: L.Map;

  bounds1 = L.latLng(42, 13);
  bounds2 = L.latLng(42, 12);
  options;
  risposta;
  public resGeojson: GeoJsonObject;
  public resJson: GeoJsonObject;

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
  }

  onMapReady(map: L.Map) {




    let MyJson = this.http.get<GeoJsonObject>('http://localhost:3000/regione');
    let GeoJson = this.http.get<GeoJsonObject>(
      'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'
    );
    forkJoin([MyJson, GeoJson]).subscribe((res) => {
      // res[0] is our MyJson
      // res[1] is our GeoJson
      console.log(res);
      this.risposta = res;
      function controlNumber(positive) {
        if (positive <= 500) {
          return {
            color: 'black',
            fillColor: 'yellow',
            fillOpacity: 1,
            opacity: 1,
            weight: 0.75,
          };
        }
        if (positive > 500 && positive <= 10000) {
          return {
            color: 'black',
            fillColor: 'orange',
            fillOpacity: 1,
            opacity: 1,
            weight: 0.75,
          };
        }
        if (positive > 10000) {
          return {
            color: 'black',
            fillColor: 'red',
            fillOpacity: 1,
            opacity: 1,
            weight: 0.75,
          };
        }
      }


      L.geoJSON(res[1], {
        onEachFeature: (features, layer) => {
          layer.bindTooltip(features.properties.reg_name);
        },

        style: (features) => {
          for (var i = 0; i < 20; i++) {
            switch ((features.properties.reg_istat_code_num - 1) as number) {
              case i:
                return controlNumber(
                  res[0][features.properties.reg_istat_code_num - 1].positive
                );
            }
          }
        },
      }).addTo(map);
    });
  }

ShowAllPositive(res){
  console.log("a")
  L.geoJSON(res[1],{
  onEachFeature: function (features, layer){
    layer.bindTooltip("<span style='font-size:100px'>"+features.properties.reg_name+ "<br>"+ res[0][features.properties.reg_istat_code_num-1].positive+"</span>", {
      permanent: true,
      direction: "center",
      className: "labelRegioni"

    }).openTooltip();
  }
}).addTo(this.map);

}
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GeoJsonObject } from 'geojson';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-map-deceduti',
  templateUrl: './mapDeceduti.component.html',
  styleUrls: ['./mapDeceduti.component.css'],
})
export class MapDeathsComponent implements OnInit {
  map: L.Map;

  bounds1 = L.latLng(42, 13);
  bounds2 = L.latLng(42, 12);
  options;
  risposta;
  rispostaScroll;
  geojson;
  dettagliRegione;
  public resGeojson: GeoJsonObject;
  public resJson: GeoJsonObject;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/regione')
      .subscribe((response) => (this.rispostaScroll = response));
    this.options = {
      layers: [
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 5.5,
            minZoom: 5,
            attribution: 'Progetto di: Bellafronte, Alfarano, Carrozzo, Caggia',
          }
        ),
      ],
      zoom: 5,
      center: L.latLng(42, 13),
      maxBounds: L.latLngBounds(this.bounds1, this.bounds2),
    };
  }

  onMapReady(map: L.Map) {
    //al mousehover colora lo spessore della regione
    const highlightFeature = (e) => {
      const layer = e.target;
      layer.setStyle({
        weight: 1.2,
        color: 'black',
        fillOpacity: 1,
      });
    };

    //recupera i dati della regione
    const ShowDetails = (e) => {
      this.dettagliRegione = this.risposta[0][
        e.target.feature.properties.reg_istat_code_num - 1
      ];
      // return this.dettagliRegione;
      this.cd.detectChanges();
    };

    //resetta la funzione highlightFeature
    const resetHighlight = (e) => {
      this.geojson.resetStyle(e.target);
    };
    //al click aumenta lo zoom
    const zoomToFeature = (e) => {
      map.fitBounds(e.target.getBounds());
    };
    //alla proprieta di L.geojson vengono assegnate direttamente più funzioni direttamente agli eventi
    const onEachFeature = (features, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: ShowDetails,
      });
      layer.bindTooltip(features.properties.reg_name);
    };

    //controllo dei positivi per assegnare la colorazione alla regione
    const controlNumber = (
      population,
      deaths,
      minDeathsThresholds,
      maxDeathsThresholds,
      minColorDeathsThresholds,
      mediumColorDeathsThresholds,
      maxColorDeathsThresholds
    ) => {
      if ((deaths / population)*100 <= minDeathsThresholds) {
        return {
          color: 'black',
          fillColor: minColorDeathsThresholds,
          fillOpacity: 0.75,
          opacity: 1,
          weight: 0.6,
        };
      }
      if (
        (deaths / population)*100 > minDeathsThresholds &&
        (deaths / population)*100 <= maxDeathsThresholds
      ) {
        return {
          color: 'black',
          fillColor: mediumColorDeathsThresholds,
          fillOpacity: 0.75,
          opacity: 1,
          weight: 0.6,
        };
      }
      if ((deaths / population)*100 > maxDeathsThresholds) {
        return {
          color: 'black',
          fillColor: maxColorDeathsThresholds,
          fillOpacity: 0.75,
          opacity: 1,
          weight: 0.6,
        };
      }
    };

    //chiamate alle 3 api per fare il fork ed avere un array con le 3 risposte
    let MyJson = this.http.get<GeoJsonObject>('http://localhost:3000/regione');
    let MyJsonSoglie = this.http.get<GeoJsonObject>(
      'http://localhost:3000/soglie'
    );
    let GeoJson = this.http.get<GeoJsonObject>(
      'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'
    );
    forkJoin([MyJson, GeoJson, MyJsonSoglie]).subscribe((res) => {
      this.risposta = res;

      this.geojson = L.geoJSON(res[1], {
        onEachFeature: onEachFeature,

        style: (features) => {
          for (var i = 0; i < 20; i++) {
            switch ((features.properties.reg_istat_code_num - 1) as number) {
              case i:
                return controlNumber(
                  res[0][features.properties.reg_istat_code_num - 1].population,
                  res[0][features.properties.reg_istat_code_num - 1].deaths,
                  res[2][1].minDeathsThresholds,
                  res[2][1].maxDeathsThresholds,
                  res[2][1].minColorDeathsThresholds,
                  res[2][1].mediumColorDeathsThresholds,
                  res[2][1].maxColorDeathsThresholds
                );
            }
          }
        },
      }).addTo(map);
      const legend = L.control.attribution({ position: 'bottomleft' });

      legend.onAdd = (map) => {
        let div = L.DomUtil.create('div'),
          grades = [
            this.risposta[2][1].minDeathsThresholds,
            this.risposta[2][1].maxDeathsThresholds,
          ],
          labels = [
            this.risposta[2][1].minColorDeathsThresholds,
            this.risposta[2][1].mediumColorDeathsThresholds,
            this.risposta[2][1].maxColorDeathsThresholds,
          ];

          div.innerHTML =
          '<div style="border: 2px solid black;font-size:14x;background-color:rgba(255,255,255,0.8);padding:15px;border-radius:15px;"> <span style="font-size:15px;">Zona basso rischio</span> <br><i class="fa fa-square" style="color:' +
          labels[0] +
          ';font-size:18px;"></i> ' +
          '0% - ' +
          grades[0]+'%' +
          '<br>' +
          '<span style="font-size:15px;">Zona medio rischio</span> <br><i class="fa fa-square" style="color:' +
          labels[1] +
          ';font-size:18px;"></i> ' +
          grades[0]+'%' +
          ' - ' +
          grades[1]+'%' +
          '<br>' +
          '<span style="font-size:15px;">Zona alto rischio </span><br><i class="fa fa-square" style="color:' +
          labels[2] +
          ';font-size:18px;"></i> ' +
          grades[1]+'%' +
          ' - 100%</div>';

        return div;
      };

      legend.addTo(map);
    });
  }
  closeShowDetails() {
    this.dettagliRegione = null;
    this.cd.detectChanges();
  }
}

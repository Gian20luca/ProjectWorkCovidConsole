import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GeoJsonObject } from 'geojson';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-map-asintomatici',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <p>Asintomatici in Italia oggi:</p>
        </div>
        <div class="col-md-10" style="margin-bottom:-100px;">
          <marquee
            direction="left"
            scrolldelay="150"
            height="30"
            width="auto"
            bgcolor="white"
            style="margin-right:5px;"

          >
            <div >
              <span *ngFor="let item of rispostaScroll"
                >{{ item.name }}:
                {{ item.asymptomatic }}</span
              >
            </div>
          </marquee>
        </div>
      </div>
      <div
        leaflet
        [leafletOptions]="options"
        (leafletMapReady)="onMapReady($event)"
        style="border: 1px black solid"
      >
        <div id="map" style="height: 500px;"></div>
      </div>
    </div>

     <div class="showdetails" *ngIf="this.dettagliRegione">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ dettagliRegione.name }}</h2>
            <button type="button" class="close" (click)="closeShowDetails()">
              <span> &times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Popolazione: {{ dettagliRegione.population }}</p>
            <p>Asintomatici: {{ dettagliRegione.positive }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      p {
        font-size: 18px;
        font-weight: 500;
      }
      span {
        margin-right: 50px;
      }
      .showdetails {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 1000;
      }
    `,
  ],
})
export class MapAsintomaticiComponent implements OnInit {
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
      .subscribe((response) => (
        this.rispostaScroll = response)
      );
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
      asymptomatic,
      minAsymptomaticThresholds,
      maxAsymptomaticThresholds,
      minColorAsymptomaticThresholds,
      mediumColorAsymptomaticThresholds,
      maxColorAsymptomaticThresholds
    ) => {
      if (asymptomatic <= minAsymptomaticThresholds) {
        return {
          color: 'black',
          fillColor: minColorAsymptomaticThresholds,
          fillOpacity: 0.75,
          opacity: 1,
          weight: 0.6,
        };
      }
      if (
        asymptomatic > minAsymptomaticThresholds &&
        asymptomatic <= maxAsymptomaticThresholds
      ) {
        return {
          color: 'black',
          fillColor: mediumColorAsymptomaticThresholds,
          fillOpacity: 0.75,
          opacity: 1,
          weight: 0.6,
        };
      }
      if (asymptomatic > maxAsymptomaticThresholds) {
        return {
          color: 'black',
          fillColor: maxColorAsymptomaticThresholds,
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
                  res[0][features.properties.reg_istat_code_num - 1]
                    .asymptomatic,
                  res[2][2].minAsymptomaticThresholds,
                  res[2][2].maxAsymptomaticThresholds,
                  res[2][2].minColorAsymptomaticThresholds,
                  res[2][2].mediumColorAsymptomaticThresholds,
                  res[2][2].maxColorAsymptomaticThresholds
                );
            }
          }
        },
      }).addTo(map);
      const legend = L.control.attribution({ position: 'bottomleft' });

      legend.onAdd = map => {
        let div = L.DomUtil.create('div'),
          grades = [this.risposta[2][2].minAsymptomaticThresholds,this.risposta[2][2].maxAsymptomaticThresholds],
          labels = [this.risposta[2][2].minColorAsymptomaticThresholds,this.risposta[2][2].mediumColorAsymptomaticThresholds,this.risposta[2][2].maxColorAsymptomaticThresholds];



          div.innerHTML = '<div style="border: 1px solid black;font-size: 15px;background-color:rgba(255,255,255,0.8);padding:7px;border-radius:15px;"> <i class="fa fa-square" style="color:' + labels[0] + '"></i> ' + '0-'+grades[0] + '<br>' + '<i class="fa fa-square" style="color:' + labels[1] + '"></i> ' + grades[0] + '-' + grades[1] + '<br>' + '<i class="fa fa-square" style="color:' + labels[2] + '"></i> ' + grades[1]+'+</div>';




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

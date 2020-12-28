import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managedeathsinput',
  template: `
    <div class="container">
      <h2>Gestione decessi</h2>
      <div class="row">
        <div class="offset-md-3 col-md-6 offset-md-3">
          <form
            #f="ngForm"
            class="card card-body mt-3"
            (ngSubmit)="onSubmit(f.value)"
          >
            <label for="region" class="control-label"
              >Seleziona una regione:
            </label>

            <select
              name="id"
              [ngModel]
              class="form-control"
              #region="ngModel"
              required
              [ngClass]="{ 'is-invalid': region.invalid && f.dirty }"
            >
              <option ngValue="1" selected>Piemonte</option>
              <option ngValue="2">Valle d'Aosta</option>
              <option ngValue="3">Lombardia</option>
              <option ngValue="4">Trentino-Alto Adige</option>
              <option ngValue="5">Veneto</option>
              <option ngValue="6">Friuli-Venezia Giulia</option>
              <option ngValue="7">Liguria</option>
              <option ngValue="8">Emilia Romagna</option>
              <option ngValue="9">toscana</option>
              <option ngValue="10">Umbria</option>
              <option ngValue="11">Marche</option>
              <option ngValue="12">Lazio</option>
              <option ngValue="13">Abruzzo</option>
              <option ngValue="14">Molise</option>
              <option ngValue="15">Campania</option>
              <option ngValue="16">Puglia</option>
              <option ngValue="17">Basilicata</option>
              <option ngValue="18">Calabria</option>
              <option ngValue="19">Sicilia</option>
              <option ngValue="20">Sardegna</option>
            </select>
            <br />

            <label>N° Positivi:</label>
            <input
              name="deaths"
              [ngModel]
              type="number"
              class="form-control"
              placeholder="Inserisci nuovi decessi"
              id="deaths"
              required
              #deaths="ngModel"
              [ngClass]="{ 'is-invalid': deaths.invalid && f.dirty }"
            />
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
              (click)="goToMapDeaths()"
            >
              Salva
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h2 {
        text-align: center;
        margin: 20px 0 20px 0;
      }
    `,
  ],
})
export class ManagedeathsinputComponent {
  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/regione/' + value.id, value)
      .subscribe((res) => {
        res[value.id].deaths = value.deaths;
      });
  }

  constructor(private http: HttpClient) {}

  goToMapDeaths(){
    window.location.href='http://localhost:4200/home/mapDeaths';
  }
}

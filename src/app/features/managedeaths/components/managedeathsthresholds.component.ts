import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-managedeathsthresholds',
  template: `
    <div class="container">
      <h2>Gestione soglie</h2>
      <div class="row">
        <div class="offset-md-3 col-md-6 offset-md-3">
          <form
            #f="ngForm"
            class="card card-body mt-3"
            (ngSubmit)="onSubmit(f.value)"
          >
            <label>Soglia inferiore:</label>
            <input
              name="minDeathsThresholds"
              [ngModel]=response.minDeathsThresholds
              type="number"
              class="form-control"
              placeholder="Inserisci soglia inferiore"
              id="minDeathsThresholds"
            />
            <br />
            <label>Soglia Superiore:</label>
            <input
              name="maxDeathsThresholds"
              [ngModel]=response.maxDeathsThresholds
              type="number"
              class="form-control"
              placeholder="Inserisci soglia superiore"
              id="maxDeathsThresholds"

            />
            <br />
            <label>Modifica Colore Primo Range</label>

            <input
              type="color"
              name="minColorDeathsThresholds"
              [ngModel]="response.minColorDeathsThresholds"
              class="form-control"
              id="minColorDeathsThresholds"
            />

            <br />

            <label>Modifica Colore Secondo Range</label>
            <input
              type="color"
              name="mediumColorDeathsThresholds"
              [ngModel]="response.mediumColorDeathsThresholds"
              class="form-control"
              id="mediumColorDeathsThresholds">
            <br />

            <label>Modifica Colore Terzo Range</label>
            <input
              type="color"
              name="maxColorDeathsThresholds"
              [ngModel]="response.maxColorDeathsThresholds"
              class="form-control"
              id="maxColorDeathsThresholds">
            <br />
            <button
              class="btn"
              [disabled]="f.invalid"
              [ngClass]="{ 'btn-success': f.valid, 'btn-warning': f.invalid }"
              (click)="goToMap()"
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
export class ManagedeathsthresholdsComponent {
  response;

  constructor(private http: HttpClient) {
    this.http
      .get('http://localhost:3000/soglie/2')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    this.http
      .patch('http://localhost:3000/soglie/2', value)
      .subscribe((res) => {
        res[2].minPositiveThresholds = value.minPositiveThresholds;
        res[2].maxPositiveThresholds = value.maxPositiveThresholds;
      });
  }

  goToMap() {
    swal(
      {
        title: 'Salvataggio avvenuto con successo',
        text: 'I tuoi dati sono stati cambiati!',
        type: 'success',
        confirmButtonText: 'Vai alla pagina principale',
      },
      function (ok) {
        if (ok) {
          window.location.href = 'http://localhost:4200/home/mapDeaths';
        }
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'bootstrap-sweetalert/dist/sweetalert.js';

@Component({
  selector: 'app-managedeathsthresholds',
  template: `
    <div class="container">
      <h2>Gestione soglie</h2>
      <div class="row">
        <div class="offset-md-3 col-md-6 offset-md-3">
          <form
          *ngIf="response"
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

  constructor(private http: HttpClient,private _router: Router) {
    this.http
      .get('http://localhost:3000/soglie/2')
      .subscribe((res) => (this.response = res));
  }

  onSubmit(value: any) {
    if (
      value.minDeathsThresholds < value.maxDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !==
        value.maxColorDeathsThresholds
    ) {
      this.http
        .patch('http://localhost:3000/soglie/2', value)
        .subscribe((res: any) => {
          res.minDeathsThresholds = value.minDeathsThresholds;
          res.maxDeathsThresholds = value.maxDeathsThresholds;
          res.minColorDeathsThresholds =
            value.minColorDeathsThresholds;
          res.mediumColorDeathsThresholds =
            value.mediumColorDeathsThresholds;
          res.maxColorDeathsThresholds =
            value.maxColorDeathsThresholds;
        });
      swal(
        {
          title: 'Salvataggio avvenuto con successo',
          text: 'I tuoi dati sono stati cambiati!',
          type: 'success',
          confirmButtonText: 'Vai alla pagina principale',
        }, () => {
          this._router.navigate(['/mapDeaths']);
        }
      );
    } else if (
      value.minDeathsThresholds > value.maxDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.maxColorDeathsThresholds &&
      value.minColorDeathsThresholds !==
        value.mediumColorDeathsThresholds &&
      value.mediumColorDeathsThresholds !==
        value.maxColorDeathsThresholds
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text:
          'La soglia inferiore non può essere maggiore della soglia superiore!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds < value.maxDeathsThresholds &&
        value.mediumColorDeathsThresholds ===
          value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni colori inseriti sono uguali!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    } else if (
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.maxColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.minColorDeathsThresholds ===
          value.mediumColorDeathsThresholds) ||
      (value.minDeathsThresholds > value.maxDeathsThresholds &&
        value.mediumColorDeathsThresholds ===
          value.maxColorDeathsThresholds)
    ) {
      swal({
        title: 'Salvataggio non avvenuto',
        text: 'Alcuni dati inseriti sono errati!',
        type: 'error',
        confirmButtonText: 'Riprova',
      });
    }
  }

}
